import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Anonymizes email addresses for GDPR compliance
 * Converts "ruben.wood1@gmail.com" to "ru***od1@***.com"
 */
export function anonymizeEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  if (!domain) return email;
  
  // Get first 2 and last 3 characters of local part
  const localStart = localPart.slice(0, 2);
  const localEnd = localPart.slice(-3);
  const maskedLocal = localStart + '***' + localEnd;
  
  // Mask domain except extension
  const domainParts = domain.split('.');
  const extension = domainParts.pop() || 'com';
  const maskedDomain = '***.' + extension;
  
  return maskedLocal + '@' + maskedDomain;
}

/**
 * Gets first two characters of email for avatar initials
 */
export function getAvatarInitials(email: string): string {
  const localPart = email.split('@')[0] || '';
  return localPart.slice(0, 2).toUpperCase();
}
