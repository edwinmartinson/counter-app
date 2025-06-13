import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function logError(error: unknown) {
  if (error instanceof Error) {
    console.error(`Error deleting task: ${error.message}`);
  } else console.error(error);
}

export const padWithZeros = (number: number, padNum: number): string => {
  return String(number).padStart(padNum, "0");
};
