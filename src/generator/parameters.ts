import { isValidWidth, isValidColor, isValidInteger, isValidString } from "./validators";

export type ImageGeneratorParams = {
    icon?: string;
    text?: string;
    width?: number | "fit-content";
    foregroundColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    type?: string;
}

const DEFAULT_PARAMS: { [key: string]: ImageGeneratorParams } = {
    ["info"]: {
        icon: "info-circle",
        backgroundColor: "BDE5F8",
        foregroundColor: "00529B",
        borderColor: "BDE5F8"
    },
    ["success"]: {
        icon: "check",
        backgroundColor: "4F8A10",
        foregroundColor: "DFF2BF",
        borderColor: "4F8A10"
    },
    ["warning"]: {
        icon: "warning",
        backgroundColor: "FEEFB3",
        foregroundColor: "9F6000",
        borderColor: "FEEFB3"
    },
    ["error"]: {
        icon: "times-circle",
        backgroundColor: "D8000C",
        foregroundColor: "FFD2D2",
        borderColor: "D8000C"
    },
    ["*"]: {
        icon: "info-circle",
        backgroundColor: "BDE5F8",
        foregroundColor: "00529B",
        borderColor: "BDE5F8",
        width: "fit-content",
        borderRadius: 5
    }
};

export const applyDefaults = (params: ImageGeneratorParams): ImageGeneratorParams => {
    params = { ...DEFAULT_PARAMS["*"], ...params };

    if (params.type && DEFAULT_PARAMS[params.type]) {
        params = { ...params, ...DEFAULT_PARAMS[params.type] }
    }

    return params;
};

// todo: generate error string
export const paramsHasErrors = (params: ImageGeneratorParams): string[] => {
    const errors: string[] = [];

    if (!isValidWidth(params.width)) errors.push("Invalid parameter `width`: Expected integer of `fit-content`");
    if (!isValidColor(params.backgroundColor)) errors.push("Invalid parameter `backgroundColor`: Invalid hex value");
    if (!isValidColor(params.foregroundColor)) errors.push("Invalid parameter `foregroundColor`: Invalid hex value");
    if (!isValidColor(params.borderColor)) errors.push("Invalid parameter `borderColor`: Invalid hex value");
    if (!isValidInteger(params.borderRadius)) errors.push("Invalid parameter `borderRadius`: Invalid integer");
    if (!isValidString(params.text)) errors.push("Invalid parameter `text`: Expected non empty string");

    return errors;
};

const htmlToPng = () => { };