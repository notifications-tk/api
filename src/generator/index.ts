import path from "path";
import { readFileSync } from "fs";
import puppeteer, { Browser, ElementHandle, Page } from "puppeteer";

import { ImageGeneratorParams, applyDefaults, paramsHasErrors, DEFAULT_PARAMS } from "./parameters";
import { renderTemplate } from "./template";

export { ImageGeneratorParams, applyDefaults, paramsHasErrors, renderTemplate };

export class Generator {
    private static page: Page;

    public static async init(): Promise<void> {
        const browser: Browser = await puppeteer.launch();
        this.page = await browser.newPage();

        const html: string = readFileSync(path.join(__dirname, "static/index.html"), 'utf8');
        await this.page.goto("data:text/html," + html, { waitUntil: "networkidle0" });

        // for some reason i need to generate a first time otherwhise links doesn't work
        await this.generate({ ...DEFAULT_PARAMS["*"], text: "init" });
    }

    public static async generate(params: ImageGeneratorParams): Promise<string | Buffer> {
        if (!this.page) throw "Generator not initialized";

        await this.page.evaluate((html: string) => {
            const elm = document.querySelector("body") as HTMLElement;
            elm.innerHTML = html;
        }, renderTemplate(params));

        const content: ElementHandle<Element> = await this.page.$("div") as ElementHandle<Element>;
        return await content.screenshot({ omitBackground: true });
    }
}