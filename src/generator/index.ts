import path from "path";
import { existsSync, readFileSync } from "fs";
import { promises as fsPromises } from "fs";
import objectHash from "object-hash";

import { ImageGeneratorParams, applyDefaults, paramsHasErrors } from "./parameters";
import { postProcessTemplate, renderTemplate } from "./template";

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

    public async generateSvg(): Promise<string> {
        const hash: string = objectHash(this.params);
        const imagePath: string = path.join("cache", hash);

        if (this.params.force === undefined) {
            const cachedImage: string | null = await this.readCache(imagePath);
            if (cachedImage != null) return cachedImage;
        }

        let result: string = renderTemplate(this.params);
        result = await postProcessTemplate(this.params, result);

        await this.writeCache(imagePath, result);
        return result;
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