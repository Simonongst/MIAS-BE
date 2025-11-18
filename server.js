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
const associateRouter = require("./routers/associateRoutes.js");
const nodemailerRouter = require("./routers/nodemailerRoutes.js");
const ackRouter = require('./routers/ackRoutes');
const verifyToken = require('./middleware/verifyToken.js');

connectDB();

app.use(cors({
    origin: [
        'https://mias-be-production.up.railway.app/',
        'http://localhost:5173'
    ],
    credentials: true
}));
app.use(express.json());
app.use(logger("dev"));

app.use('/auth', authRouter);
app.use('/acknowledgement', ackRouter);
app.use(verifyToken);
app.use('/assets', assetRouter);
app.use('/users', userRouter);
app.use('/invoices', invoiceRouter);
app.use('/transactions', transactionRouter);
app.use('/associates', associateRouter);
app.use('/mails', nodemailerRouter);

const PORT = process.env.PORT ? process.env.PORT : "3000";

app.listen(PORT, () => {
    console.log(`The express app is ready on port ${PORT}!`);
});