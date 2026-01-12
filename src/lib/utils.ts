import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Swedish organization number format: XXXXXX-XXXX
 */
const ORG_NUMBER_REGEX = /^\d{6}-\d{4}$/;

/**
 * Validates that an org number follows Swedish format: XXXXXX-XXXX
 */
export function isValidOrgNumber(orgNumber: string): boolean {
  return ORG_NUMBER_REGEX.test(orgNumber);
}

/**
 * Formats org number input by adding hyphen after 6 digits.
 * Removes non-digits and limits to 10 digits.
 */
export function formatOrgNumber(value: string): string {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '').slice(0, 10);

  // Add hyphen after 6 digits
  if (digits.length > 6) {
    return `${digits.slice(0, 6)}-${digits.slice(6)}`;
  }

  return digits;
}
