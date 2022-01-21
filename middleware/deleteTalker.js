const fs = require('fs').promises;

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile('talker.json', 'utf-8');
  const result = await JSON.parse(data);
  const filteredTalker = result.filter((talker) => talker.id !== Number(id));
  await fs.writeFile('talker.json', JSON.stringify(filteredTalker));
  return res.status(204).end();
};

module.exports = { deleteTalker };