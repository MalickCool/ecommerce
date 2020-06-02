const express = require("express");
const router = express.Router();

const DetailsCommande = require("../../models/DetailCommande");

router.post("/ajouter" , (req, res) => {

    const Details = new DetailsCommande({
        commande_Id: req.body.commande_Id,
        articleId: req.body.articleId,
        prixUnitaire: req.body.prixUnitaire,
        quantite: req.body.quantite
    });

    Details
        .save()
        .then(datails => res.json(datails))
        .catch(err => console.log(err));
});

router.get("/get", (req, res) => {

    Details.findById(req.query.id).then(details => {
        res.send(details);
    })

});

module.exports = router;