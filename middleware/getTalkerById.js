const fs = require('fs').promises;

const getAllTalkerById = async (req, res) => {
    const data = await fs.readFile('./talker.json', 'utf-8');
    const result = await JSON.parse(data);

    const { id } = req.params;
    const talkers = result.find((talker) => talker.id === +id);
    // console.log(talkers);

    if (!talkers) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    return res.status(200).json(talkers);
};

module.exports = getAllTalkerById;