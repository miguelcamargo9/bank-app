import { format } from 'date-fns';

export const formatDate = (dateString, formatString = 'dd/MM/yyyy') => {
  return format(new Date(dateString), formatString);
};
