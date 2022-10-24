import { format, addMonths, addYears, endOfYear } from 'date-fns';
import { pt } from 'date-fns/locale';
// types
import { TMonthRef } from '@src/@types/common';

// ----------------------------------------------------------------------

export const fDateWritten = (date: Date | string | number) => {
  return format(new Date(date), 'dd MMMM yyyy', {
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

// ----------------------------------------------------------------------

const getMonthDifference = (start: Date, end: Date) => {
  return end.getMonth() - start.getMonth() + 12 * (end.getFullYear() - start.getFullYear());
};

/** used to fill month selector */
export const createMonthList = () => {
  const start = new Date('01/01/2022');
  const end = endOfYear(addYears(new Date(), 1));
  const difference = getMonthDifference(start, end);
  return Array.from(Array(difference + 1)).map((e, i) => {
    const refDate = addMonths(start, i);
    let label = `${format(refDate, 'MMM yy', { locale: pt })}`;
    label = label.charAt(0).toUpperCase() + label.slice(1);
    return {
      id: label,
      label: label,
      refDate: refDate,
    } as TMonthRef;
  });
};

export const isSameMonth = (dateLeft: Date, dateRight: Date): boolean => {
  const sameYear = dateLeft.getFullYear() === dateRight.getFullYear();
  const sameMonth = dateLeft.getMonth() === dateRight.getMonth();
  return sameYear && sameMonth;
};
