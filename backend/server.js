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

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/orders", orderRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {

    res.send("CRM Backend Running");

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});