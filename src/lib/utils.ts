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