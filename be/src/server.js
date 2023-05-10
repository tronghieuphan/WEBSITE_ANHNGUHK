import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
require("dotenv").config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
initWebRoutes(app);

connectDB(app);

let port = 9000;

app.listen(port, () => {
    console.log("Backend HK-EDU is running:" + port);
});
