// import express from "express";

// const app = express();

// app.get("/", (req, res) => {

//     res.send("CRM Backend Running");

// });

// const PORT = 5000;

// app.listen(PORT, () => {

//     console.log(`Server running on port ${PORT}`);

// });




import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import importRoutes from "./routes/importRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";



dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/orders", orderRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/import", importRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {

    res.send("CRM Backend Running");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});