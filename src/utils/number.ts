/**
 * Example: formatNumber(10000, 2) => 10,000.00
 */
const formatNumber = (amount: number, decimalPlaces = 2): string => {
  if (amount === undefined || amount == null) return '';
  const strAmount = amount.toFixed(decimalPlaces);
  let formattedString = '';
  let counter = 0;
  const startingIdx =
    strAmount.indexOf('.') !== -1
      ? strAmount.indexOf('.') - 1
      : strAmount.length - 1;
  for (let idx = startingIdx; idx >= 0; idx--) {
    const ch = strAmount[idx];
    if (counter !== 0 && counter % 3 === 0) {
      formattedString = `,${formattedString}`;
      counter = 0;
    }
    formattedString = ch + formattedString;
    counter++;
  }
  return formattedString + strAmount.substring(startingIdx + 1);
};

const limitDecimalCount = (
  number: string | number,
  decimalPlaces: number
): string => {
  let str = number.toString();
  const parts = str.split('.');
  if (str.includes('.') && parts[1] && parts[1].length > decimalPlaces) {
    if (parts[1].length > decimalPlaces) {
      parts[1] = parts[1].substring(0, decimalPlaces);
      str = parts.join('.');
    }
  }
  return str;
};

const addSignToNumber = (num: number): string => {
  const shouldAddMinus = num.toString() && num.toString()[0] !== '-';
  return (num > 0 ? '+' : shouldAddMinus ? '-' : '') + num;
};

const abbreviateNumber = (num: number): string => {
  let newValue = num.toString();
  if (num >= 1000) {
    const suffixes = ['', 'k', 'm', 'b', 't'];
    const suffixNum = Math.floor(Math.log10(Math.abs(num)) / 3);
    let shortValue = '';
    for (let precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0 ? num / Math.pow(1000, suffixNum) : num).toFixed(
          precision
        )
      ).toString();
      const dotLessShortValue = (shortValue + '').replace(
        /[^a-zA-Z 0-9]+/g,
        ''
      );
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    newValue = shortValue + (suffixes[suffixNum] || '');
  }
  return newValue;
};

export const NumberUtils = {
  formatNumber,
  addSignToNumber,
  abbreviateNumber,
  limitDecimalCount
};
