const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommandesSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    montant: {
        type: Number,
        required: true
    }
});

module.exports = Commandes = mongoose.model("commandes", CommandesSchema);