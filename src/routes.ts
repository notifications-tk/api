import express from "express";

import { getImage } from "./controller";

const router = express.Router();

router.get("/", getImage);

router.options("/*", (res: express.Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.sendStatus(200);
});

export default router;