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
        const imagePath: string = this.getCachePath("svg");
        const cachedContent: Content | null = await this.checkCache(imagePath);
        if(cachedContent != null) return cachedContent;

        let result: string = renderTemplate(this.params);
        result = await postProcessTemplate(this.params, result);

        await this.writeCache(imagePath, result);
        return {
            type: "image/svg",
            value: result
        };
    }

    public async generatePng(): Promise<Content> {
        const imagePath: string = this.getCachePath("png");
        const cachedContent: Content | null = await this.checkCache(imagePath);
        if(cachedContent != null) return cachedContent;

        const svg: Content = await this.generateSvg();
        const pngBuffer: Buffer = await sharp(Buffer.from(svg.value)).png().toBuffer();

        await this.writeCache(imagePath, pngBuffer);
        return {
            type: "image/png",
            value: pngBuffer
        };
    }

    private getCachePath(extension: string): string {
        const hash: string = `${objectHash(this.params)}.${extension}`;
        return path.join("cache", hash);
    }

    private async checkCache(path: string): Promise<Content | null> {
        if (this.params.force === undefined) {
            const cachedImage: Buffer | null = await this.readCache(path);
            if (cachedImage != null) return {
                type: `image/${path.split(".").pop()}`,
                value: cachedImage
            };
        }

        return null;
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