import cors from "cors";
import express from "express";

//routes
import oracledb from "oracledb";
import getConnection from "./config/db.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";
import billingRoutes from "./routes/billingRoutes.js";
// import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res,next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api/students", studentRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/billing", billingRoutes);
// app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
