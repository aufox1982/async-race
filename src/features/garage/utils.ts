import { CAR_BRANDS, CAR_MODELS } from '@/constants';

/** Returns a random integer in [0, max). */
function randomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

/** Generates a random hex color string, e.g. "#a3f2c1". */
export function generateRandomColor(): string {
  // eslint-disable-next-line no-magic-numbers
  const hex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0');
  return `#${hex}`;
}

/** Combines a random brand + model into a car name, e.g. "Tesla Model S". */
export function generateRandomCarName(): string {
  const brand = CAR_BRANDS[randomInt(CAR_BRANDS.length)];
  const model = CAR_MODELS[randomInt(CAR_MODELS.length)];
  return `${brand} ${model}`;
}

/**
 * Validates a car name.
 * Returns an error message string, or null if valid.
 */
export function validateCarName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length === 0) return 'Name cannot be empty';
  if (trimmed.length > 50) return 'Name is too long (max 50 characters)';
  return null;
}
