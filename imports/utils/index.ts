import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { lazy } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Loadable = (loader: () => Promise<any>) => lazy(loader);

/**
 * Generates a random alphanumeric code of a specified length.
 * The code consists of uppercase letters (A-Z) and digits (0-9).
 *
 * IMPORTANT: This function generates a random code, but does NOT guarantee its uniqueness.
 * You MUST check the generated code against your database to ensure it's not already in use.
 *
 * @param {number} length - The desired length of the code.
 * @returns {string} A randomly generated alphanumeric code.
 */
export const generateAlphanumericCode = (length: number = 6): string => {
  // Define the set of characters to use for the code
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;

  // Loop 'length' times to build the code
  for (let i = 0; i < length; i++) {
    // Pick a random character from the 'characters' string
    // Math.random() generates a float between 0 (inclusive) and 1 (exclusive)
    // Math.floor() rounds down to the nearest integer
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
