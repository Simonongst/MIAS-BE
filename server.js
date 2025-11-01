require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");

const connectDB = require("./db/db.js")
const authRouter = require("./routers/authRoutes.js")
const assetRouter = require("./routers/assetRoutes.js");
const userRouter = require("./routers/userRoutes.js");
const invoiceRouter = require("./routers/invoiceRoutes.js");
const transactionRouter = require("./routers/transactionRoutes.js");
const verifyToken = require('./middleware/verifyToken.js');

connectDB();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use('/auth', authRouter);
app.use(verifyToken);
app.use('/assets', assetRouter);
app.use('/users', userRouter);
app.use('/invoices', invoiceRouter);
app.use('/transactions', transactionRouter);

const PORT = process.env.PORT ? process.env.PORT : "3000";

app.listen(PORT, () => {
    console.log(`The express app is ready on port ${PORT}!`);
});