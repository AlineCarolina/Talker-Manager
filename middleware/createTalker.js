const fs = require('fs').promises;

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length !== 16) return res.status(401).json({ message: 'Token invalido' });
    next();
};

const createTalker = (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ mensage: 'O campo "name" é obrigatório' });
    if (name < 3) {
        return res.status(400).json({ mensage: 'O "name" deve ter pelo menos 3 caracteres' });
        }
    next();
};

const createAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) return res.status(400).json({ mensage: 'O campo "age" é obrigatório' });
    if (age < 18) {
        return res.status(400).json({ mensage: 'A pessoa palestrante deve ser maior de idade' });
        }
    next();
};

const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
        }
    next();
};

const createTalk = (req, res, next) => {
    const { talk: { watchedAt, rate } } = req.body;
    const reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/; /* https://stackoverflow.com/questions/10194464/javascript-dd-mm-yyyy-date-check */
    const validDate = reg.test(watchedAt);
    if (!validDate) {
        return res.status(400).json({
            mensage: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa' });
    }
    if (rate < 1 || rate > 5) {
        return res.status(400).json({
            mensage: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

const addTalk = async (req, res) => {
    const data = await fs.readFile('talker.json', 'utf-8')
        .then((response) => JSON.parse(response));
    const addTalker = { id: data.length + 1, ...req.body };
    data.push(addTalker);
    await fs.writeFile('talker.json', JSON.stringify(data));
    return res.status(201).send(addTalker);
};

module.exports = {
    validateToken,
    createTalker,
    createAge,
    validateTalk,
    createTalk,
    addTalk,
};