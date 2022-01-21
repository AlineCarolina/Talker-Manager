const fs = require('fs/promises');

const editTalker = async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile('talker.json', 'utf-8');
  const result = await JSON.parse(data);
  const index = result.findIndex((f) => f.id === Number(id));
  result[index] = { ...result[index], ...req.body, id: Number(id) };
  await fs.writeFile('talker.json', JSON.stringify(result));
  return res.status(200).json(result[index]);
};

module.exports = { editTalker };