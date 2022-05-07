import path from "path";
import { promises as fsPromises, existsSync } from "fs";
import objectHash from "object-hash";
import sharp from "sharp";

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
        const hash: string = objectHash(this.params) + ".svg";
        const imagePath: string = path.join("cache", hash);

        if (this.params.force === undefined) {
            const cachedImage: Buffer | null = await this.readCache(imagePath);
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

    public async generatePng(): Promise<Content> {
        const hash: string = objectHash(this.params) + ".png";
        const imagePath: string = path.join("cache", hash);

        if (this.params.force === undefined) {
            const cachedImage: Buffer | null = await this.readCache(imagePath);
            if (cachedImage != null) return {
                type: "image/png",
                value: cachedImage
            };
        }

        let result: string = renderTemplate(this.params);
        result = await postProcessTemplate(this.params, result);  

        const pngBuffer: Buffer = await sharp(Buffer.from(result)).png().toBuffer();

        await this.writeCache(imagePath, pngBuffer);
        return {
            type: "image/png",
            value: pngBuffer
        };
    }

    private async readCache(path: string): Promise<Buffer | null> {
        if (existsSync(path)) {
            return await fsPromises.readFile(path);
        }

        return null;
    }

    private async writeCache(path: string, content: Buffer | string): Promise<void> {
        if (!existsSync("cache")) {
            await fsPromises.mkdir("cache");
        }

        await fsPromises.writeFile(path, content);
    }
}