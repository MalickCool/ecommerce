const express = require("express");
const router = express.Router();

const Commandes = require("../../models/Commande");

router.post("/ajouter" , (req, res) => {

    const newCommande = new Commandes({
        user: req.body.user,
        montant: req.body.montant
    });

    newCommande
        .save()
        .then(commande => res.json(commande))
        .catch(err => console.log(err));
});

router.all("/all", (req, res) => {

    Commandes.find({}).then(commandes => {
        res.send(commandes);
    })

});

router.get("/get", (req, res) => {

    Commandes.findById(req.query.id).then(commandes => {
        res.send(commandes);
    })

});

module.exports = router;