import { format } from 'date-fns';

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return '';
  return format(new Date(dateString), "MMMM d, yyyy h:mm a");
}
