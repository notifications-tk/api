import { Request, Response } from "express";

import { Generator, applyDefaults, ImageGeneratorParams, paramsHasErrors } from "./generator";

export const getImage = async (req: Request, res: Response) => {
    let params: ImageGeneratorParams = req.query as unknown as ImageGeneratorParams;
    params = applyDefaults(params);

    const errors: string[] = paramsHasErrors(params);
    if (errors.length > 0)
        return res.status(300).send({
            errors: errors
        });;

    const data = await Generator.generate(params);
    
    res.set("Content-Type", "image/png");
    res.send(data);
}