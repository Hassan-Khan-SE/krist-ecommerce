import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import UserRouter from "./routes/User.js";
import ProductRoutes from "./routes/Products.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello GFG Developers",
  });
});

// Routes
app.use("/api/user/", UserRouter);
app.use("/api/products/", ProductRoutes);

// Error handle middleware (Routes ke niche hona zaroori hai)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Database Connection
const connectDB = () => {
  mongoose.set("strictQuery", true);
  
  // process.env.MONGO_URI lagaya jo .env se match karta hai
  const dbUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/krist_ecommerce';
  
  mongoose
    .connect(dbUrl)
    .then(() => console.log("🚀 Connected to MONGO DB Successfully!"))
    .catch((err) => {
      console.error("❌ failed to connect with mongo");
      console.error(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();