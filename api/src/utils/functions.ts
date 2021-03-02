export function asArray<T>(v: T | T[]): T[] {
    return Array.isArray(v) ? v : [v];
}

export function toStringArray(data: string, delimiter: string): string[] {
    return data.split(delimiter);
}

export function toNumber(data: string,): string | number {
    return isNaN(Number(data)) ? data : Number(data);
}

export function fixNewLines(text: string): string {
    return text.replace(/(\r\n)+/g, " ");
}