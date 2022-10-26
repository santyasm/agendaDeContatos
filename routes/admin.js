const express = require('express');
const mongoose= require('mongoose');
const router = express.Router();
require('../models/Contato');
const Contato = mongoose.model('contatos');

router.get('/', (req, res) => {
	res.render('admin/criacontato');
});

router.post('/criacontato', (req, res) => {
	const novoContato = new Contato({
		nome: req.body.nome,
		telefone: req.body.telefone,
		email: req.body.email,
		complementares: req.body.complementares,
		aniversario: req.body.aniversario
	});
	novoContato.save().then(() => {
		console.log('Contato adicionado com sucesso.');
		res.redirect('/');
	}).catch((err) => {
		console.log(err);
	});
});

module.exports = router;