import numeral from 'numeral';

// ----------------------------------------------------------------------

numeral.register('locale', 'pt', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'mil',
    million: 'mi',
    billion: 'bi',
    trillion: 'tri',
  },
  ordinal: function (number) {
    return number === 1 ? 'er' : 'ème';
  },
  currency: {
    symbol: 'R$',
  },
});
numeral.locale('pt');

// ----------------------------------------------------------------------

export const fCurrency = (number: string | number) => {
  return numeral(number).format('0,0.00');
};
