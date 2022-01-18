const express = require('express');
const bodyParser = require('body-parser');
const getAllTalkers = require('./middleware/getAllTalkers');
const getTalkerById = require('./middleware/getTalkerById');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 01
app.get('/talker', getAllTalkers);

// Requisito 02
app.get('/talker/:id', getTalkerById);

app.listen(PORT, () => {
  console.log('Online');
});
