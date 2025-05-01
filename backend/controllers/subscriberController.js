const Subscriber = require("../models/Subscriber");
const transporter = require("../utils/emailTransporter"); // Reusing Nodemailer setup

// 📩 Subscribe to Newsletter
exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "You're already subscribed!" });
    }

    // Save new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // 📧 Send Confirmation Email
    const mailOptions = {
      from: `"Your Company" <${process.env.CLIENT_EMAIL_QUOTES}>`,
      to: email,
      subject: "🎉 Subscription Confirmed!",
      text: `Thank you for subscribing to our newsletter! Stay tuned for updates.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "✅ Subscription successful. Confirmation email sent." });
  } catch (error) {
    console.error("❌ Error subscribing to newsletter:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// 🔍 Fetch All Subscribers (Admin Panel)
exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    console.error("❌ Error fetching subscribers:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Delete an email
exports.deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    await Subscriber.findByIdAndDelete(id);
    res.status(200).json({ message: "Subscriber deleted successfully" });
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
