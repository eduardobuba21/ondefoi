import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

// ----------------------------------------------------------------------

export const fDateWritten = (date: Date | string | number) => {
  return format(new Date(date), `dd 'de' MMMM 'de' yyyy`, {
    locale: pt,
  });
};

export const fDateTimeWritten = (date: Date | string | number) => {
  return format(new Date(date), 'dd MMM yyyy p', {
    locale: pt,
  });
};

//

export const fDate = (date: Date | string | number) => {
  return format(new Date(date), 'dd/MM/yyyy', {
    locale: pt,
  });
};

export const fDateTime = (date: Date | string | number) => {
  return format(new Date(date), 'dd/MM/yyyy p', {
    locale: pt,
  });
};
