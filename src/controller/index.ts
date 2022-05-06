import { Request, Response } from "express";

import { applyDefaults, ImageGeneratorParams, paramsHasErrors, renderTemplate } from "../generator";
import { postProcessTemplate } from "../generator/template";

export const getPng = async (req: Request, res: Response) => {
    // TODO: implement
}

export const getSvg = async (req: Request, res: Response) => {
    let params: ImageGeneratorParams = req.query as unknown as ImageGeneratorParams;
    params = applyDefaults(params);

    const errors: string[] = paramsHasErrors(params);
    if (errors.length > 0)
        return res.status(300).send({
            errors: errors
        });

    let result: string = renderTemplate(params);
    result = await postProcessTemplate(params, result);
    
    res.set("Content-Type", "image/svg");
    res.send(result.toString());
}