import aiService from '../services/ai.service.js';

const askAi = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const response = await aiService.queryClaude(prompt, {
      tenantId: req.user.tenantId,
      userId: req.user.userId,
    });
    res.json({ response });
  } catch (error) {
    next(error);
  }
};

export default {
  askAi,
};
