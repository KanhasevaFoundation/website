const express = require('express');
const Donation = require('../models/Donation');
const AnalyticsEvent = require('../models/AnalyticsEvent');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
// NOTE: Ensure these environment variables are set in your .env file
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// Personal donation with Razorpay support
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

    // 1. Save initial donation record as Pending
    const donation = new Donation({
      donorType,
      personalDetails,
      donationType,
      money: donationType === 'Money' ? moneyAmount : null,
      status: 'Pending'
    });

    // 2. If it's a Money donation, create Razorpay Order
    let razorpayOrderId = null;
    if (donationType === 'Money') {
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        console.error("Razorpay keys are missing.");
        donation.status = 'Failed';
        await donation.save();
        return res.status(500).json({ error: "Server configuration error: Payment gateway not initialized." });
      }

      try {
        const options = {
          amount: Math.round(Number(moneyAmount) * 100), // amount in smallest currency unit (paise)
          currency: "INR",
          receipt: `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        };
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const order = await razorpay.orders.create(options);
        razorpayOrderId = order.id;
        donation.razorpayOrderId = razorpayOrderId;
      } catch (razorpayError) {
        console.error("Razorpay Order Creation Error:", razorpayError);

        // Debugging: Log loaded keys (masked)
        const keyId = process.env.RAZORPAY_KEY_ID ? `${process.env.RAZORPAY_KEY_ID.substring(0, 8)}...` : 'MISSING';
        const keySecret = process.env.RAZORPAY_KEY_SECRET ? 'PRESENT' : 'MISSING';
        console.log(`[DEBUG] Loaded RAZORPAY_KEY_ID: ${keyId}`);
        console.log(`[DEBUG] Loaded RAZORPAY_KEY_SECRET: ${keySecret}`);

        // Update status to Failed if order creation fails
        donation.status = 'Failed';
        donation.failureReason = razorpayError.error?.description || razorpayError.message || 'Razorpay Order Creation Failed';
        await donation.save();
        return res.status(502).json({
          error: "Payment Gateway Error",
          details: razorpayError.error?.description || "Failed to create payment order. Check server logs/keys."
        });
      }
    } else {
      // Non-money donations are effectively successful immediately upon record creation
      donation.status = 'Success';
    }

    await donation.save();

    // 3. Return necessary details to frontend
    res.status(200).send({
      donationId: donation._id,
      razorpayOrderId: razorpayOrderId,
      amount: donationType === 'Money' ? Math.round(Number(moneyAmount) * 100) : 0,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID // Send key_id to frontend
    });

  } catch (err) {
    console.error("Error in /donate/personal:", err);
    res.status(500).send({ error: 'Error saving donation', details: err.message });
  }
});

// Verify Payment Endpoint
router.post('/donate/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donationId } = req.body;

  try {
    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      donation.razorpayPaymentId = razorpay_payment_id;
      donation.razorpaySignature = razorpay_signature;
      donation.status = "Success";
      await donation.save();

      res.status(200).json({ status: "Success", message: "Payment verified successfully" });
    } else {
      donation.status = "Failed";
      donation.failureReason = 'Invalid Payment Signature';
      await donation.save();
      res.status(400).json({ status: "Failed", message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Restaurant donation (Unchanged mostly, just ensure status is set)
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
      money: donationType === 'Money' ? moneyAmount : null,
      status: 'Success' // Restaurant donations (food) are successful upon entry
    });

    await donation.save();
    res.status(200).send({ donationId: donation._id });
  } catch (err) {
    res.status(500).send({ error: 'Error saving donation' });
  }
});

const authMiddleware = require('../middleware/authMiddleware');

// Route to get all donations for the admin page
router.get('/donations', authMiddleware, async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});


// Route to get dashboard statistics
router.get('/admin/stats', authMiddleware, async (req, res) => {
  try {
    const donations = await Donation.find();

    // Calculate Total Revenue (Only from 'Success' money donations)
    const totalRevenue = donations
      .filter(d => d.status === 'Success' && d.money)
      .reduce((acc, curr) => acc + curr.money, 0);

    // Calculate Total Donors (Unique phone numbers from successful donations)
    const uniqueDonors = new Set();
    donations.forEach(d => {
      if (d.status === 'Success') {
        const phone = d.donorType === 'Personal' ? d.personalDetails?.phoneNumber : d.restaurantDetails?.contactNumber;
        if (phone) uniqueDonors.add(phone);
      }
    });
    const totalDonors = uniqueDonors.size;

    // Total Transactions (All attempts)
    const totalTransactions = donations.length;

    // Successful Transactions
    const successfulTransactions = donations.filter(d => d.status === 'Success').length;

    // Total Website Visits (Analytics)
    let totalVisits = 0;
    try {
      totalVisits = await AnalyticsEvent.countDocuments();
    } catch (e) {
      console.error("Analytics count error:", e);
    }

    res.json({
      totalRevenue,
      totalDonors,
      totalTransactions,
      successfulTransactions,
      totalVisits
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;
