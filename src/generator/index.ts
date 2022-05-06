import path from "path";
import { existsSync, readFileSync } from "fs";
import { promises as fsPromises } from "fs";
import objectHash from "object-hash";

import { ImageGeneratorParams, applyDefaults, paramsHasErrors, DEFAULT_PARAMS } from "./parameters";
import { renderTemplate } from "./template";

export { ImageGeneratorParams, applyDefaults, paramsHasErrors, renderTemplate };

export class Generator {
    public static async generate(params: ImageGeneratorParams): Promise<void> {/*
        if (!this.page) throw "Generator not initialized";

        const hash: string = objectHash(params);
        const imagePath: string = path.join("cache", hash);
        
        if (params.force === undefined && existsSync(imagePath)) {           
            return await fsPromises.readFile(imagePath);
        }

        //await this.page.evaluate((html: string) => {
        //    const elm = document.querySelector("body") as HTMLElement;
        //    elm.innerHTML = html;
        //}, renderTemplate(params));

        const content: ElementHandle<Element> = await this.page.$("div") as ElementHandle<Element>;
        const image = await content.screenshot({ omitBackground: true });

        if (!existsSync("cache")) {
            await fsPromises.mkdir("cache");
        }

        await fsPromises.writeFile(imagePath, image);
        return image;*/
    }
}