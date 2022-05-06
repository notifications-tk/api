import express from "express";

import { getSvg, getPng } from "../controller";

const router = express.Router();

router.get("/svg", getSvg);
router.get("/png", getPng);
router.get("/*", getSvg);

router.options("/*", (res: express.Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.sendStatus(200);
});

export default router;