const fs = require('fs').promises;

const getAllTalkers = async (_req, res) => {
    const data = await fs.readFile('./talker.json', 'utf-8');
    const result = await JSON.parse(data);

    return res.status(200).json(result);
};

module.exports = getAllTalkers;
