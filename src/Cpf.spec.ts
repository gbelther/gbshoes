import { Cpf } from './Cpf';

it('should validate an valid CPF', () => {
  const cpf = new Cpf('586.934.244-91');
  expect(cpf.value).toBe('586.934.244-91');
});

const invalidsCpf = [
  '111.111.111-11',
  '123.456.789-00',
  '857.321.523-98',
  '',
  '123',
];

it.each(invalidsCpf)('should throw if try to create an invalid CPF', (cpf) => {
  expect(() => new Cpf(cpf)).toThrow(new Error('CPF Inválido'));
});
