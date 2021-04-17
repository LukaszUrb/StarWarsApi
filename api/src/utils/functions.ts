import { BadRequest, ServiceUnavailable } from "../errors";
import fetch, { Response } from "node-fetch";

export function asArray<T>(v: T | T[]): T[] {
    return Array.isArray(v) ? v : [v];
}

const asArray2 = <T>(v: T | T[]): T[] => {
    return Array.isArray(v) ? v : [v];
};

export function toStringArray(data: string, delimiter: string): string[] {
    return data.split(delimiter);
}

export function toNumber(data: string,): string | number {
    return isNaN(Number(data)) ? data : Number(data);
}

export function fixNewLines(text: string): string {
    return text.replace(/(\r\n)+/g, " ");
}

export function randomFromRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function dataFetch<TPayload>(url: string): Promise<TPayload> {
    let response: Response;
    try {
        response = await fetch(url);
    } catch (err) {
        throw new ServiceUnavailable("External service is unavailable.");
    }

    if (!response.ok) throw new BadRequest();

    return await response.json();
}
