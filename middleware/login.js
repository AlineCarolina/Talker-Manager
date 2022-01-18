const login = (req, res, next) => {
    const { email } = req.body;

    const reg = /^[\w.+]+@\w+.\w{2,}(?:.\w{2})?$/; /* https://pt.stackoverflow.com/questions/348854/fun%C3%A7%C3%A3o-em-javascript-para-valida%C3%A7%C3%A3o-de-email-n%C3%A3o-entra-no-else */

    const validEmail = reg.test(email);

    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

    if (!validEmail) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
};

const loginPassword = (req, res, next) => {
    const { password } = req.body;

    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });

    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
};

const token = (_req, res) => res.status(200).json({ token: '7mqaVRXJSp886CGr' });

module.exports = {
    login,
    loginPassword,
    token,
};
