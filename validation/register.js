const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    
    if(Validator.isEmpty(data.name)) {
        errors.name = "Champs Nom requis";
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = "Champs Email requis";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email invalide";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Champ Mot de Passe requis";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Champ Confirmer Mot de Passe requis";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30})) {
        errors.password = "Le Mot de Passe doit contenir au moins 6 charactères";
    }

    if (!Validator.isLength(data.password2, { min: 6, max: 30})) {
        errors.password2 = "Le Mot de Passe doit contenir au moins 6 charactères";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Les Mots de Passe ne correspondent pas";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}