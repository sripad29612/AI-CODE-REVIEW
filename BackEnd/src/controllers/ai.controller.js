const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  const { code, language } = req.body;
  if (!code) return res.status(400).send("Code is required");

  const prompt = `Language: ${language}\n\n${code}`;
  const response = await aiService(prompt);
  res.send(response);
};

