const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contato = new Schema({
	nome: {
		type: String,
		required: true 
	},
	telefone: {
		type: String, 
		required: true
	}, 
	email: {
		type: String,
		required: true
	},
	aniversario: {
		type: String
	},
	complementares: {
		type: String
	}
});

mongoose.model('contatos', Contato);