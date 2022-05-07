import { Request, Response } from "express";

import { Generator } from "../generator";
import { Content } from "../generator/content";

export const getPng = async (req: Request, res: Response) => {
    // TODO: implement
}

export const getSvg = async (req: Request, res: Response) => {
    await generate(req, res,  "generateSvg");
}

async function generate(req: Request, res: Response, generatorFunc: keyof Generator): Promise<void> {
    const generator: Generator = new Generator(req.query);

    const errors: string[] = generator.validateParams();
    if (errors.length > 0)
    {
        res.status(300).send({ errors: errors });
        return;
    }

    const content: Content = await generator[generatorFunc]() as unknown as Content;
    
    res.set("Content-Type", content.type);
    res.send(content.value);
}