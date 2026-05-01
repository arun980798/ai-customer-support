import Ticket from '../models/ticket.model.js';

const createTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.create({
      ...req.body,
      userId: req.user.userId,
      tenantId: req.user.tenantId,
    });
    res.status(201).json({ ticket });
  } catch (error) {
    next(error);
  }
};

const getTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ tenantId: req.user.tenantId });
    res.json({ tickets });
  } catch (error) {
    next(error);
  }
};

const updateTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.user.tenantId },
      req.body,
      { new: true }
    );
    res.json({ ticket });
  } catch (error) {
    next(error);
  }
};

export default {
  createTicket,
  getTickets,
  updateTicket,
};
