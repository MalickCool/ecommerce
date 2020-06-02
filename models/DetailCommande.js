const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetailsCommandeSchema = new Schema({
    commande_Id: {
        type: Schema.Types.ObjectId,
        ref: "commandes"
    },
    articleId: {
        type: String,
        required: true
    },
    prixUnitaire: {
        type: Number,
        required: true
    },
    quantite: {
        type: Number,
        required: true
    }
});

module.exports = DetailsCommande = mongoose.model("detailscommande", DetailsCommandeSchema);