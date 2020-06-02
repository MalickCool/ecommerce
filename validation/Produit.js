const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.designation = !isEmpty(data.designation) ? data.designation : "";
    data.prix = !isEmpty(data.prix) ? data.prix : "";
    data.quantite = !isEmpty(data.quantite) ? data.quantite : "";
    data.image = !isEmpty(data.image) ? data.image : "";
    data.categorie_id = !isEmpty(data.categorie_id) ? data.categorie_id : "";

    
    if(Validator.isEmpty(data.designation)) {
        errors.designation = "Champs Désignation requis";
    }

    if(Validator.isEmpty(data.prix)) {
        errors.prix = "Champs Prix requis";
    }

    if(Validator.isEmpty(data.quantite)) {
        errors.quantite = "Champs Quantité requis";
    }

    if(Validator.isEmpty(data.image)) {
        errors.image = "Champs Image requis";
    }

    if(Validator.isEmpty(data.categorie_id)) {
        errors.categorie_id = "Champs Catégorie requis";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}