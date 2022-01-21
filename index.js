const express = require('express');
const bodyParser = require('body-parser');
const getAllTalkers = require('./middleware/getAllTalkers');
const getTalkerById = require('./middleware/getTalkerById');
const {
  login, 
  loginPassword,
  token,
} = require('./middleware/login');
const {
  validateToken,
  createTalker,
  createAge,
  validateTalk,
  createTalk,
  addTalk,
} = require('./middleware/createTalker');
const { editTalker } = require('./middleware/editTalker');
const { deleteTalker } = require('./middleware/deleteTalker');

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

// Requisito 03
app.post('/login', login, loginPassword, token);

// Requisito 04
app.post('/talker',
  validateToken,
  createTalker,
  createAge,
  validateTalk,
  createTalk,
  addTalk);

// Requisito 05
app.put('/talker/:id',
  validateToken,
  createTalker,
  createAge,
  validateTalk,
  createTalk,
  editTalker);

// Requisito 06
app.delete('/talker/:id',
  validateToken,
  deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});
