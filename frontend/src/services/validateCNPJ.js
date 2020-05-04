export function validateCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  let error;
  let size;
  let numbers;
  let digits;
  let sum;
  let pos;
  let result;

  if (cnpj == '') error = 'O CNPJ é obrigatório';

  if (cnpj.length != 14) error = 'O CNPJ deve conter 14 dígitos';

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == '00000000000000' ||
    cnpj == '11111111111111' ||
    cnpj == '22222222222222' ||
    cnpj == '33333333333333' ||
    cnpj == '44444444444444' ||
    cnpj == '55555555555555' ||
    cnpj == '66666666666666' ||
    cnpj == '77777777777777' ||
    cnpj == '88888888888888' ||
    cnpj == '99999999999999'
  )
    error = 'O CNPJ é inválido';

  // Valida DVs
  size = cnpj.length - 2;
  numbers = cnpj.substring(0, size);
  digits = cnpj.substring(size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result != digits.charAt(0)) error = 'O CNPJ é inválido';

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result != digits.charAt(1)) error = 'O CNPJ é inválido';

  return error;
}
