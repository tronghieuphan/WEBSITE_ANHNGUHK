import express from "express";

let router = express.Router();

let initWebRotes = (app) => {
    router.get("/", (req, res) => {
        res.send("Backend LVTN Web");
    });

    return app.use("/", router);
};

export default initWebRotes;
