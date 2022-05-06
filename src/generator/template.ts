import { ImageGeneratorParams } from "./parameters";
import { promises as fsPromises } from "fs";

// TODO: handle border color #${params.borderColor}

export const renderTemplate = (params: ImageGeneratorParams): string =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${params.width}" height="40">
        <rect x="0" y="0" width="100%" height="100%" rx="${params.borderRadius}" ry="${params.borderRadius}" fill="#${params.backgroundColor}" />

        {{ ${params.icon} }}

        <text x="50" y="50%" width="100%" fill="#${params.foregroundColor}" font-family="Roboto" alignment-baseline="middle">
            ${params.text}
        </text>

        <defs>
            <style type="text/css">
                @import url("https://fonts.googleapis.com/css?family=Roboto:400");
            </style>
        </defs>
    </svg>`;

export const postProcessTemplate = async (params: ImageGeneratorParams, template: string): Promise<string> => {
    // process icon
    const iconParts: RegExpMatchArray = template.match(/{{ ([^-]*)-(.*) }}/)!;
    let iconSource: string = await fsPromises.readFile(`./dist/static/icons/${iconParts[1]}/${iconParts[2]}.svg`, "utf-8");
    iconSource = iconSource.replace("path", `path fill="#${params.foregroundColor}"`);
    
    template = template.replace(/{{ ([^-]*)-(.*) }}/, iconSource);

    // process text (align with icon)
    const iconViewBox: RegExpMatchArray = iconSource.match(/viewBox="([0-9]+) ([0-9]+) ([0-9]+) ([0-9]+)"/)!;
    const originalHeight: number = Number.parseInt(iconViewBox[3]);
    const originalWidth: number = Number.parseInt(iconViewBox[4]);
    const finalWidth: number = (originalWidth * 24) / originalHeight;

    template = template.replace(/<text(.*)x=\"([^\"]*)\"/, `<text$1x="${30 + finalWidth}"`);

    return template;
}