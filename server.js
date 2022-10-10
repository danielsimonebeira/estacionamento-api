const express = require("express");
const cors = require("cors");
const req = require("express/lib/request");
const res = require("express/lib/response");


const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({ message: "Bem vindo a api de estacionamento." });
});

require("./app/routes/estacionamento.routers")(app)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('----------------------------------------');
    console.log(`Servidor esta rodando na porta ${PORT}. `);
    console.log('----------------------------------------');
});

const db = require("./app/models");
db.sequelize.sync().then(() => {
    console.log("DB sincronizado ");
}).catch((err) => {
    console.log("Falha para sicronizar DB: " + err.message);
});