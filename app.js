const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const admin = require('./routes/admin');
const mongoose = require('mongoose');

//Congigurações
//Template Engine
app.use(express.urlencoded({ extended: true }));

//Mongoose
mongoose.connect('mongodb://localhost/agendacontatos').then(() => {
	console.log('Connectado ao mongoDB.');
}).catch((err) => {
	console.log(err);
});

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

//Rotas
app.get('/', (req, res) => {
	res.render('index');
});

app.use('/admin', admin);

<<<<<<< HEAD
const port = 9898;
app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
});
=======
const port = 9595;
app.listen(port);
>>>>>>> 7c094f08d87ca42470a139ed066714f51753fedb
