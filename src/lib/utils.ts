import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const moveElementToFront = <T>(arr: T[], targetIndex: number): T[] => {
  if (targetIndex >= 0 && targetIndex < arr.length) {
    let targetElement: T = arr.splice(targetIndex, 1)[0];
    arr.unshift(targetElement);
  }
  return arr;
}

export const convertToSlug = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/\-\-+/g, '')
    .trim();
}