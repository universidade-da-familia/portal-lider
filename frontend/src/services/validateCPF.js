/* eslint-disable */
export function validateCPF(cpf) {
  const formattedCpf = cpf
    .replace('.', '')
    .replace('.', '')
    .replace('-', '');

  let error;
  let sum = 0;
  let rest = 0;

  if (formattedCpf === '') return;

  if (formattedCpf.length !== 11) error = 'O CPF deve conter 11 dígitos';

  if (
    formattedCpf.toString() === '00000000000' ||
    formattedCpf.toString() === '11111111111' ||
    formattedCpf.toString() === '99999999999'
  )
    error = 'O CPF é inválido';

  for (let index = 1; index <= 9; index++) {
    sum =
      sum +
      parseInt(formattedCpf.toString().substring(index - 1, index)) *
        (11 - index);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(formattedCpf.toString().substring(9, 10)))
    error = 'O CPF é inválido';

  sum = 0;

  for (let index = 1; index <= 10; index++) {
    sum =
      sum +
      parseInt(formattedCpf.toString().substring(index - 1, index)) *
        (12 - index);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(formattedCpf.toString().substring(10, 11)))
    error = 'O CPF é inválido';

  return error;
}
