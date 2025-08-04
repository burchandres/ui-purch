import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// used by shadcn
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
