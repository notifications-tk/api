import { ImageGeneratorParams, applyDefaults, paramsHasErrors } from "./parameters";
import { renderTemplate } from "./template";

export { ImageGeneratorParams, applyDefaults, paramsHasErrors, renderTemplate };

export const generateImage = (params: ImageGeneratorParams): string => {
    const html: string = renderTemplate(params);

    // TODO: html to image

    return html;
}