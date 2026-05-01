const Message = require('../models/message.model');

const sendMessage = async (req, res, next) => {
  try {
    const message = await Message.create({
      ...req.body,
      senderId: req.user.userId,
    });
    res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ ticketId: req.params.ticketId }).sort('createdAt');
    res.json({ messages });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
