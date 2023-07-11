import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();

let app = express();

const fileUpload = require("express-fileupload");

app.use(fileUpload());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(cors());
app.use(cookieParser());
initWebRoutes(app);
connectDB(app);

let port = 9000;

app.listen(port, () => {
    console.log("Backend HK-EDU is running:" + port);
});
