const path = require("path");
const nodemailer = require("nodemailer");
const Applicant = require("../models/applicant");

// Ensure required env variables exist
if (!process.env.CLIENT_EMAIL_CAREER || !process.env.CLIENT_EMAIL_PASSWORD_CAREER || !process.env.CLIENT_EMAIL_CAREER) {
  console.error("❌ Missing required email environment variables. Please check your .env file.");
  process.exit(1);
}

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CLIENT_EMAIL_CAREER,
    pass: process.env.CLIENT_EMAIL_PASSWORD_CAREER,
  },
});

/**
 * Dynamically import `nodemailer-express-handlebars`
 */
async function configureHandlebars() {
  const { default: hbs } = await import("nodemailer-express-handlebars");

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extname: ".hbs",
        layoutsDir: path.join(__dirname, "../emailTemplates/views"),
        partialsDir: path.join(__dirname, "../emailTemplates/partials"),
        defaultLayout: false,
      },
      viewPath: path.join(__dirname, "../emailTemplates/views"),
      extName: ".hbs",
    })
  );
}

// Call the function to configure Handlebars
configureHandlebars().catch(console.error);

/*Handle Career Form Submission */

exports.applyForJob = async (req, res) => {
  try {
    const { name, dob, phone, email, addressLine1, addressLine2, city, state, zip } = req.body;
    const resumePath = req.file ? `uploads/resumes/${req.file.filename}` : null;

    if (!resumePath) {
      return res.status(400).json({ message: "Resume upload failed. Please try again." });
    }

    // Save Applicant to MongoDB
    const newApplicant = new Applicant({
      name,
      dob,
      phone,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      zip,
      resume: resumePath,
    });

    await newApplicant.save();

    // Get Absolute Path for Email Attachment
    const resumeAbsolutePath = path.join(__dirname, "..", resumePath);

    // 📩 Send Email to Client
    const clientMailOptions = {
      from: `"Job Applications" <${process.env.CLIENT_EMAIL_CAREER}>`,
      to: process.env.CLIENT_EMAIL_CAREER, // Client's email to receive resumes
      subject: `📄 New Job Application - ${name}`,
      template: "clientNotification",
      context: { name, dob, phone, email, addressLine1, addressLine2, city, state, zip },
      attachments: [{ filename: path.basename(resumePath), path: resumeAbsolutePath }],
    };

    // 📩 Send Confirmation Email to Applicant
    const applicantMailOptions = {
      from: `"Your Company" <${process.env.CLIENT_EMAIL_CAREER}>`,
      to: email, // Applicant's email
      subject: "✅ Application Received - Thank You!",
      template: "applicantConfirmation",
      context: { name, year: new Date().getFullYear() },
    };

    // Send Both Emails
    await Promise.all([
      transporter.sendMail(clientMailOptions), // Send to client
      transporter.sendMail(applicantMailOptions), // Send confirmation to applicant
    ]);

    res.status(200).json({ message: "✅ Application submitted successfully. Emails sent." });
  } catch (error) {
    console.error("❌ Error submitting application:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


// Get All Applicants
exports.getAllApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applicants.length,
      data: applicants,
    });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};