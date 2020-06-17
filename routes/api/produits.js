const express = require("express");
const router = express.Router();

const validateRegisterInput = require("../../validation/Produit");

const Produit = require("../../models/Produit");
const Categories = require("../../models/Categories");

router.post("/ajouter" , (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(404).json(errors);
    }

    Produit.findOne({ designation: req.body.designation }).then(produit => {
        //console.log(req);
        if(produit){
            return res.status(400).json({ libelle: "Ce Produit existe déja"});
        }else{

            Categories.findById( req.body.categorie_id ).then(categorie => {
                if(categorie){
                    const newProduit = new Produit({
                        designation: req.body.designation,
                        prix: req.body.prix,
                        quantite: req.body.quantite,
                        image: req.body.image,
                        categorie_id: req.body.categorie_id
                    });
        
                    newProduit
                        .save()
                        .then(produit => res.json(produit))
                        .catch(err => console.log(err));
                }else{
                    return res.status(400).json({ libelle: "Cette Catégorie n'existe pas"});
                }
            });
        }
    });
});
router.all("/all", (req, res) => {

    Produit.find({}).then(Produits => {
        res.send(Produits);
    })

});
router.get("/get", (req, res) => {
    Produit.findById(req.query.id).then(produits => {
        res.send(produits);
    })
});

router.get("/getProducts", (req, res) => {
    Produit.find({ 'categorie_id': req.query.id}).then(produits => {
        res.send(produits);
    })
});

module.exports = router;