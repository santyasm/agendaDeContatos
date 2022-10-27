const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const admin = require('./routes/admin');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');

//Congigurações
//Template Engine
app.use(express.urlencoded({ extended: true }));

//Mongoose
mongoose.connect('mongodb://localhost/agendacontatos').then(() => {
	console.log('Connectado ao mongoDB.');
}).catch((err) => {
	console.log(err);
});

//session
app.use(
	session({
		secret: '123456',
		resave: false,
		saveUninitialized: true,
	}));

app.use(flash());
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

//Middleware
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	next();
});

//Rotas
app.get('/', (req, res) => {
	res.render('index');
});

app.use('/admin', admin);

const port = 9898;
app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
});

