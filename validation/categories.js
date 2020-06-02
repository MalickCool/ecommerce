const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.libelle = !isEmpty(data.libelle) ? data.libelle : "";
    data.description = !isEmpty(data.description) ? data.description : "";

    
    if(Validator.isEmpty(data.libelle)) {
        errors.name = "Champs Libellé requis";
    }

    if(Validator.isEmpty(data.description)) {
        errors.name = "Champs Description requis";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}