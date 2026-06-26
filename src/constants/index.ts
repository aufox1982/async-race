// API
export const API_URL = import.meta.env.VITE_API_URL as string;

// Pagination
export const CARS_PER_PAGE = 7;
export const WINNERS_PER_PAGE = 10;

// Race / generation
export const RANDOM_CARS_COUNT = 100;
export const MS_PER_SECOND = 1000;
export const TIME_DECIMAL_PLACES = 2;

// Animation — matches the width set in CarRow.module.css
export const CAR_ICON_WIDTH_PX = 80;

// Car name generation — at least 10 parts each (task requirement)
export const CAR_BRANDS = [
  'Tesla',
  'Ford',
  'BMW',
  'Mercedes',
  'Audi',
  'Toyota',
  'Honda',
  'Chevrolet',
  'Dodge',
  'Ferrari',
  'Lamborghini',
  'Porsche',
] as const;

export const CAR_MODELS = [
  'Model S',
  'Mustang',
  'M3',
  'C63 AMG',
  'RS6',
  'Supra',
  'Civic Type R',
  'Camaro',
  'Challenger',
  'F40',
  'Huracan',
  '911 GT3',
] as const;

// UI
export const DEFAULT_CAR_COLOR = '#e74c3c';
export const WINNER_BANNER_DURATION_MS = 4000;
