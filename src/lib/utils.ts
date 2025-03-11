import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateBatchId(existingIds: string[] = []): string {
  const prefix = 'B';
  const padding = 4;
  let counter = 1;

  while (true) {
    const newId = `${prefix}${String(counter).padStart(padding, '0')}`;
    if (!existingIds.includes(newId)) {
      return newId;
    }
    counter++;
  }
}

export function generateProductId(existingIds: string[] = []): string {
  const prefix = 'P';
  const padding = 4;
  let counter = 1;

  while (true) {
    const newId = `${prefix}${String(counter).padStart(padding, '0')}`;
    if (!existingIds.includes(newId)) {
      return newId;
    }
    counter++;
  }
}

export function generateOrderId(existingIds: string[] = []): string {
  const prefix = 'OD';
  const padding = 4;
  let counter = 1;

  while (true) {
    const newId = `${prefix}${String(counter).padStart(padding, '0')}`;
    if (!existingIds.includes(newId)) {
      return newId;
    }
    counter++;
  }
}