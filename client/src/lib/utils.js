import { clsx } from 'clsx';

export function cn(...classes) {
  return clsx(classes);
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en', { notation: value > 9999 ? 'compact' : 'standard' }).format(value || 0);
}

export function xpForNextLevel(level) {
  return Math.pow(level, 2) * 100;
}

export function initials(name = 'Focus User') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}
