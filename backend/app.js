// backend/app.js
import { config } from "dotenv";
config({ path: "./config/config.env" }); // load env (adjust path if you move config)

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";

import userRouter from "./router/userRoutes.js";
import auctionItemRouter from "./router/auctionItemRoutes.js";
import bidRouter from "./router/bidRoutes.js";
import commissionRouter from "./router/commissionRouter.js";
import superAdminRouter from "./router/superAdminRoutes.js";

import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import { verifyCommissionCron } from "./automation/verifyCommissionCron.js";

const app = express();

// parse body & cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// file upload
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

// CORS: make sure FRONTEND_URL does NOT have trailing slash in config.env
const FRONTEND = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
app.use(
    cors({
        origin: FRONTEND,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);

// simple health check
app.get("/", (req, res) => res.send("API is running"));

// mount API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/commission", commissionRouter);
app.use("/api/v1/superadmin", superAdminRouter);

// start cron jobs & DB connection
endedAuctionCron();
verifyCommissionCron();
connection();

// global error handler (should be last)
app.use(errorMiddleware);

export default app;
