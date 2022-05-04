export const isValidInteger = (value?: number): boolean =>
    Number.isInteger(value);

export const isValidWidth = (value?: number | "fit-content"): boolean =>
    value != null && Number.isInteger(Number.parseInt(value.toString())) || value == "fit-content";

export const isValidColor = (value?: string): boolean =>
    value != null && /^[0-9a-f]{3}(?:[0-9a-f]{3})?(?:[0-9a-f]{2})?$/gmi.test(value);

export const isValidString = (value?: string): boolean =>
    value != null && value.trim().length > 0;