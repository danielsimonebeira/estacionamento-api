const db = require("../models");
const Estacionamento = db.estacionamento;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "O conteúdo não pode ficar vazio!"
        });
        return;
    }

    const estacionamento = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Estacionamento.create(estacionamento).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao criar o Estacionamento"
        });
    });

};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null

    Estacionamento.findAll({ where: condition }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocorreu algum erro ao recuperar os Estacionamentos"
        })
    })

};

exports.findOne = (req, res) => {
    const id =  req.params.id;

    Estacionamento.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Não é possível encontrar o estacionamento de id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Erro ao recuperar o estacionamento com id = " + id
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Estacionamento.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Estacionamento foi atualizado com sucesso."
            });
        } else {
            message: `Não foi possivel atualizar com o id=${id}. Talvez Estacionamento não foi encontrado ou  `
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error ao atualizar estacionamento with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Estacionamento.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Estacionamento foi deletado com sucesso!"
            });
        } else {
            res.send({
                message: `Não foi possivel deletar o estacionamento de id=${id}. Talvez Estacionamento não foi encontrado`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: "Não foi possivel deletar o Estacionamento de id=" + id
        });
    });

};

