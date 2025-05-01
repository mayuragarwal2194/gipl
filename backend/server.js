const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config({ path: "./.env" });

// Initialize Express app
const app = express();

// Constants
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow sending cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    exposedHeaders: ["Content-Disposition"], // For file downloads
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Import routes
const careerRoutes = require("./routes/applicantRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const blogRoutes = require("./routes/blogRoutes");

// Start server function
const startServer = async () => {
  try {
    await connectDB(MONGODB_URI);
    console.log("Database connected successfully");

    // Routes
    app.use("/api/v1/career", careerRoutes);
    app.use("/api/v1/admin/auth", adminAuthRoutes);
    app.use("/api/v1/newsletter", subscriberRoutes);
    app.use("/api/v1/quote", quoteRoutes);
    app.use("/api/v1/category", categoryRoutes);
    app.use("/api/v1/subcategory", subCategoryRoutes);
    app.use("/api/v1/products", productRoutes)
    app.use("/api/v1/blogs", blogRoutes)

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1); // Exit process with failure
  }
};

// Start the server
startServer();