const express = require('express');
const app = express();
const { engine } = require('express-handlebars');

//Congigurações
//Template Engine
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

//Rotas
app.get('/', (req, res) => {
	res.render('index');
});

const port = 9898;
app.listen(port);