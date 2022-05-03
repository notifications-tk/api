import { Request, Response } from "express";

import { applyDefaults, ImageGeneratorParams, paramsHasErrors } from "./generator";

export const getImage = (req: Request, res: Response) => {
    let params: ImageGeneratorParams = req.query as unknown as ImageGeneratorParams;
    params = applyDefaults(params);

    const errors: string[] = paramsHasErrors(params);
    if (errors.length > 0)
        return res.status(300).send({
            errors: errors
        });;

    res.status(200);
}