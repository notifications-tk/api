import express from "express";

const router = express.Router();

router.options("/*", (res: express.Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.sendStatus(200);
});

export default router;