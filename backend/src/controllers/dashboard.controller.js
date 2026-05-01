const Ticket = require('../models/ticket.model');

const getOverview = async (req, res, next) => {
  try {
    const openCount = await Ticket.countDocuments({ tenantId: req.user.tenantId, status: 'open' });
    const pendingCount = await Ticket.countDocuments({ tenantId: req.user.tenantId, status: 'pending' });
    const closedCount = await Ticket.countDocuments({ tenantId: req.user.tenantId, status: 'closed' });
    res.json({ openCount, pendingCount, closedCount });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOverview,
};
