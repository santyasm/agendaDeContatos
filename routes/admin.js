const express = require('express');
const mongoose= require('mongoose');
const router = express.Router();
require('../models/Contato');
const Contato = mongoose.model('contatos');

router.get('/', (req, res) => {
	res.render('admin/criacontato');
});

router.get('/criacontato', (req, res) => {
	res.render('admin/criacontato');
});

router.post('/criacontato', (req, res) => {
	const erros = [];
	
	if (!req.body.nome || typeof req.body.nome == 'undefined' || req.body.nome == null) {
		erros.push({texto: 'Nome inválido.'});
	}
	if (!req.body.telefone || typeof req.body.telefone == 'undefined' || req.body.telefone == null) {
		erros.push({texto: 'Telefone inválido.'});
	}
	if (!req.body.email || typeof req.body.email == 'undefined' || req.body.email == null) {
		erros.push({ texto: 'Email inválido.' });
		
	}

	if (erros.length > 0) {
		res.render('admin/criacontato', { erros: erros });
	} else {
		const novoContato = new Contato({
			nome: req.body.nome,
			telefone: req.body.telefone,
			email: req.body.email,
			complementares: req.body.complementares,
			aniversario: req.body.aniversario,
		});
		novoContato
			.save()
			.then(() => {
				console.log('Contato adicionado com sucesso.');
				req.flash('success_msg', 'Contato adicionado com sucesso!');
				res.redirect('/admin/listadecontatos');
			})
			.catch((err) => {
				console.log(err);
			});
	}
});


//Lista de Contatos
router.get('/listadecontatos', (req, res) => {
	Contato.find().lean().sort({date: 'desc'}).then((contatos) => {
		res.render('admin/listadecontatos', {contatos});
	}).catch((err) => {
		console.log(err);
	});
	
});

//Remove Contato
router.get('/removecontato/:id', (req, res) => {
	Contato.remove({ _id: req.params.id }).then(() => {
		req.flash('success_msg', 'Contato deletado.');
		res.redirect('/admin/listadecontatos');
	}).catch((err) => {
		console.log(err);
	});
});

module.exports = router;