const express = require('express');
const mongoose = require("mongoose");
const bodyPaser = require('body-parser');
const passport = require("passport");

const users = require("./routes/api/users");
const categories = require("./routes/api/categories");
const produits = require("./routes/api/produits");
const commandes = require("./routes/api/commandes");
const detailcommandes = require("./routes/api/detailscommande");

const app = express();

app.use(
    bodyPaser.urlencoded({
        extended: false
    })
);

app.use(bodyPaser.json());

const db = require('./config/key').mongoURI;

mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfuly connected"))
    .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);

app.use("/api/categorie", categories);

app.use("/api/produit", produits);

app.use("/api/commande", commandes);

app.use("/api/detailcmd", detailcommandes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server up and running!'));
