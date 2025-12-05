const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const chatWithAI = async (prompt) => {
  //req.body
  try {
    const response = await cohere.v2.chat({
      model: "command-r",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      // Pomala temperatura - pogolema preciznost vo odgovori
      // Pogolema temperatura - pokreativni odgovori
    });

    console.log(response);

    return {
      success: true,
      answer: response.message.content[0].text,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
};

module.exports = { chatWithAI };
