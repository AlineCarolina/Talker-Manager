const fs = require('fs').promises;

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
    next();
};

const createTalker = (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
        }
    next();
};

const createAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
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
    const { talk } = req.body;
    const reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/; /* https://stackoverflow.com/questions/10194464/javascript-dd-mm-yyyy-date-check */
    const validDate = reg.test(talk.watchedAt);
    if (!validDate) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (talk.rate < 1 || talk.rate > 5) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
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