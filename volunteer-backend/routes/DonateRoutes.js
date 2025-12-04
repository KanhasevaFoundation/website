const express = require('express');
const Donation = require('../models/Donation');
const router = express.Router();

// Personal donation
router.post('/donate/personal', async (req, res) => {
  const { donorType, personalDetails, donationType, moneyAmount } = req.body;

  try {
    const validDonorType = donorType === 'Personal';
    const pd = personalDetails || {};
    const required = pd.name && pd.age && pd.phoneNumber && pd.email;
    const validPhone = typeof pd.phoneNumber === 'string' && /^[0-9]{10}$/.test(pd.phoneNumber);
    const validEmail = typeof pd.email === 'string' && /\S+@\S+\.\S+/.test(pd.email);
    const validMoney = donationType !== 'Money' || (!isNaN(Number(moneyAmount)) && Number(moneyAmount) > 0);
    if (!validDonorType || !required || !validPhone || !validEmail || !validMoney) {
      return res.status(400).send({ error: 'Invalid donation data' });
    }

    const donation = new Donation({
      donorType,
      personalDetails,
      donationType,
      moneyAmount: donationType === 'Money' ? moneyAmount : null,
    });

    await donation.save();
    res.status(200).send({ donationId: donation._id });
  } catch (err) {
    res.status(500).send({ error: 'Error saving donation' });
  }
});

// Restaurant donation
router.post('/donate/restaurant', async (req, res) => {
  const { donorType, restaurantDetails, donationType, moneyAmount } = req.body;

  try {
    const validDonorType = donorType === 'Restaurant';
    const rd = restaurantDetails || {};
    const required = rd.name && rd.location && rd.contactNumber && rd.email;
    const validPhone = typeof rd.contactNumber === 'string' && /^[0-9]{10}$/.test(rd.contactNumber);
    const validEmail = typeof rd.email === 'string' && /\S+@\S+\.\S+/.test(rd.email);
    const validMoney = donationType !== 'Money' || (!isNaN(Number(moneyAmount)) && Number(moneyAmount) > 0);
    if (!validDonorType || !required || !validPhone || !validEmail || !validMoney) {
      return res.status(400).send({ error: 'Invalid donation data' });
    }

    const donation = new Donation({
      donorType,
      restaurantDetails,
      donationType,
      moneyAmount: donationType === 'Money' ? moneyAmount : null,
    });

    await donation.save();
    res.status(200).send({ donationId: donation._id });
  } catch (err) {
    res.status(500).send({ error: 'Error saving donation' });
  }
});

// Route to get all donations for the admin page
router.get('/donations', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});


module.exports = router;
