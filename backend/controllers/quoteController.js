const Quote = require("../models/Quote");
const nodemailer = require("nodemailer");

exports.getQuote = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Save Quote Request to Database
    const newQuote = new Quote({ name, email, phone, message });
    await newQuote.save();

    // Send Email Notification to Admin
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CLIENT_EMAIL_QUOTES,
        pass: process.env.CLIENT_EMAIL_PASSWORD_QUOTES,
      },
    });

    const mailOptions = {
      from: process.env.CLIENT_EMAIL_QUOTES,
      to: process.env.CLIENT_EMAIL_QUOTES,
      subject: "New Quote Request",
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Quote request submitted successfully." });

  } catch (error) {
    console.error("Error submitting quote request:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 }); // Fetch all quotes, latest first
    res.status(200).json({ success: true, data: quotes });
  } catch (error) {
    console.error("Error fetching quote requests:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

exports.deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuote = await Quote.findByIdAndDelete(id);
    
    if (!deletedQuote) {
      return res.status(404).json({ success: false, message: "Quote request not found" });
    }

    res.status(200).json({ success: true, message: "Quote request deleted successfully" });
  } catch (error) {
    console.error("Error deleting quote request:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};
