/**
 * @providesModule @fa-masks
 */

import {MaskService} from 'react-native-masked-text';

const nameRegexWithAccents = /[^A-Za-z^\u00C0-\u017F+\s]/g;
const onlyNumbersRegex = /[^0-9]+/g;

export const cellphoneMask = (value) =>
  value ? MaskService.toMask('cel-phone', value) : value;

export const dateMask = (value) =>
  value ? MaskService.toMask('datetime', value, {format: 'MM/DD/YYYY'}) : value;

export const cpfMask = (value) =>
  value ? MaskService.toMask('cpf', value) : value;

export const nameMask = (value) =>
  value && value.replace(nameRegexWithAccents, '');

export const onlyNumbersMask = (value) => {
  if (value) {
    return value.trim().replace(onlyNumbersRegex, '');
  }
};

export const cepMask = (value) => {
  const numbers = onlyNumbersMask(value);

  if (numbers && numbers.length >= 6) {
    return numbers.slice(0, 5) + '-' + numbers.slice(5, 9);
  }

  return numbers;
};

export const cnpjMask = (value) =>
  value ? MaskService.toMask('cnpj', value) : value;

// export const removeMask = (value) => {
//   value = value.replace(/\./g, '');
//   return parseFloat(/\d+,\d+/.exec(value)[0].toString());
// };

export const removeMask = (value) => {
  value = value.replace(/\./g, '');
  let valores = value.match(/\d+/g);

  if (valores.length > 1) {
    return parseFloat(valores[0].toString() + '.' + valores[1].toString());
  } else {
    return parseFloat(valores[0].toString());
  }
};
export const money = (value) =>
  value
    ? MaskService.toMask('money', value, {
        precision: 2,
        separator: ',',
        delimiter: '.',
        unit: 'R$ ',
        suffixUnit: '',
      })
    : value;

export const moneyLarge = (value) =>
  value
    ? MaskService.toMask('money', value, {
        precision: 0,
        separator: ',',
        delimiter: '.',
        unit: 'R$ ',
        suffixUnit: '',
      })
    : value;

export const hour = (value) =>
  value
    ? MaskService.toMask('custom', value, {
        /**
         * mask: (String | required | default '')
         * the mask pattern
         * 9 - accept digit.
         * A - accept alpha.
         * S - accept alphanumeric.
         * * - accept all, EXCEPT white space.
         */
        mask: '99:99',
      })
    : value;

export const percentMask = (value) => {
  if (!value) {
    return value;
  }

  console.log(value.length);

  if (value.length > 5) {
    return value.slice(0, 5);
  }
  return value
    ? MaskService.toMask('money', value, {
        precision: 2,
        separator: ',',
        delimiter: '.',
        unit: '',
        suffixUnit: '',
      })
    : value;
};
