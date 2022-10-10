module.exports = app => {
    const estacionamento = require("../controllers/estacionamento.controller");

    var router =  require("express").Router();

    router.post("/", estacionamento.create);
    router.get("/", estacionamento.findAll);
    router.get("/:id", estacionamento.findOne);
    router.put("/:id", estacionamento.update);
    router.delete("/:id", estacionamento.delete);

    app.use('/api/estacionamentos', router);
};