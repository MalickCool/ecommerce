const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if(Validator.isEmpty(data.email)) {
        errors.email = "Champs Email requis";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email invalide";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Champ Mot de Passe requis";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}