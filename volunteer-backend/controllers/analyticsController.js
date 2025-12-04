const AnalyticsEvent = require('../models/AnalyticsEvent');

exports.recordEvent = async (req, res) => {
  try {
    const { type, path, element, referrer } = req.body;
    if (!type || !path) return res.status(400).json({ message: 'type and path are required' });

    const event = await AnalyticsEvent.create({
      type,
      path,
      element,
      referrer,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });
    res.status(201).json({ message: 'recorded', id: event._id });
  } catch (err) {
    res.status(500).json({ message: 'failed to record', error: err.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const pipeline = [
      { $group: { _id: { type: '$type', path: '$path' }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ];
    const grouped = await AnalyticsEvent.aggregate(pipeline);
    const totals = await AnalyticsEvent.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);
    res.json({ grouped, totals });
  } catch (err) {
    res.status(500).json({ message: 'failed to load summary', error: err.message });
  }
};

exports.listEvents = async (req, res) => {
  try {
    const { limit = 50 } = req.query;
    const events = await AnalyticsEvent.find().sort({ createdAt: -1 }).limit(Number(limit));
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'failed to load events', error: err.message });
  }
};
