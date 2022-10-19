const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('test');
});

const port = 5555;
app.listen(port);