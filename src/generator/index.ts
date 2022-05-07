import path from "path";
import { existsSync, readFileSync } from "fs";
import { promises as fsPromises } from "fs";
import objectHash from "object-hash";

import { ImageGeneratorParams, applyDefaults, paramsHasErrors } from "./parameters";
import { postProcessTemplate, renderTemplate } from "./template";
import { Content } from "./content";

export class Generator {
    private params: ImageGeneratorParams;

    public constructor(params: unknown) {
        this.params = params as ImageGeneratorParams;
    }

    public validateParams(): string[] {
        this.params = applyDefaults(this.params);

        const errors: string[] = paramsHasErrors(this.params);
        return errors;
    }

    public async generateSvg(): Promise<Content> {
        const hash: string = objectHash(this.params);
        const imagePath: string = path.join("cache", hash);

        if (this.params.force === undefined) {
            const cachedImage: string | null = await this.readCache(imagePath);
            if (cachedImage != null) return {
                type: "image/svg",
                value: cachedImage
            };
        }

        let result: string = renderTemplate(this.params);
        result = await postProcessTemplate(this.params, result);

        await this.writeCache(imagePath, result);
        return {
            type: "image/svg",
            value: result
        };
    }

    private async readCache(path: string): Promise<string | null> {
        if (existsSync(path)) {
            return await fsPromises.readFile(path, "utf-8");
        }

        return null;
    }

    private async writeCache(path: string, content: string): Promise<void> {
        if (!existsSync("cache")) {
            await fsPromises.mkdir("cache");
        }

        await fsPromises.writeFile(path, content);
    }
}