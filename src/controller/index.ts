import { Request, Response } from "express";

import { Generator } from "../generator";

export const getPng = async (req: Request, res: Response) => {
    // TODO: implement
}

export const getSvg = async (req: Request, res: Response) => {
    const generator: Generator = new Generator(req.query);

    const errors: string[] = generator.validateParams();
    if (errors.length > 0)
        return res.status(300).send({
            errors: errors
        });
    
    res.set("Content-Type", "image/svg");
    res.send(await generator.generateSvg());
}