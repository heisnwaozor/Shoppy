import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: 'USDC' | 'SOL' = 'USDC', solRate = 160): string {
  if (currency === 'USDC') {
    return `$${amount.toFixed(2)} USDC`;
  }
  const sol = amount / solRate;
  return `${sol.toFixed(3)} SOL`;
}
