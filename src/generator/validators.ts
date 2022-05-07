import { existsSync } from "fs";

export const isValidInteger = (value?: number): boolean =>
    Number.isInteger(value);

export const isValidWidth = (value?: number): boolean =>
    value != null && Number.isInteger(Number.parseInt(value.toString()));

export const isValidColor = (value?: string): boolean =>
    value != null && /^[0-9a-f]{3}(?:[0-9a-f]{3})?(?:[0-9a-f]{2})?$/gmi.test(value);

export const isValidString = (value?: string): boolean =>
    value != null && value.trim().length > 0;

export const isValidIcon = (value?: string): boolean => {
    if(!value) return false;    

    const match: RegExpMatchArray | null = /([^-]*)-(.*)/.exec(value);
    if (match == null || !match[1] || !match[2]) return false;

    const path: string = `static/icons/${match[1]}/${match[2]}.svg`; 
    return existsSync(path);
}