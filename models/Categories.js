const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    libelle: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }
});

module.exports = Categories = mongoose.model("categories", CategoriesSchema);