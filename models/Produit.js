const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProduitSchema = new Schema({
    designation: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    quantite: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    categorie_id: {
        type: String,
        required: true
    }
});

module.exports = Produit = mongoose.model("Produit", ProduitSchema);