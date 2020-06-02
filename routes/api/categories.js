const express = require("express");
const router = express.Router();

const validateRegisterInput = require("../../validation/categories");

const Categories = require("../../models/Categories");

router.post("/ajouter" , (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(isValid){
        //return res.status(404).json(errors);
    }

    //console.log(req);

    Categories.findOne({ libelle: req.body.libelle }).then(categorie => {
        //console.log(req);
        if(categorie){
            return res.status(400).json({ libelle: "Cette catégorie existe déja"});
        }else{
            const newCategorie = new Categories({
                libelle: req.body.libelle,
                description: req.body.description
            });

            newCategorie
                .save()
                .then(categorie => res.json(categorie))
                .catch(err => console.log(err));
        }
    });
});

router.all("/all", (req, res) => {

    Categories.find({}).then(categories => {
        res.send(categories);
    })

});

router.get("/get", (req, res) => {

    Categories.findById(req.query.id).then(categories => {
        res.send(categories);
    })

});

module.exports = router;