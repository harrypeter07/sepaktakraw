/**
 * Date formatting utilities to prevent hydration mismatches
 */

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Use a consistent format that works the same on server and client
  return dateObj.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function formatDateShort(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Use a consistent format that works the same on server and client
  return dateObj.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short'
  });
}

export function formatDateISO(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // ISO format is always consistent
  return dateObj.toISOString().split('T')[0];
}
