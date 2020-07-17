const convert = require('./convert');

test('convert cotacao 4 e quantidade 4', () => {
  expect(convert.convert(4, 4)).toBe(16)
})

test('convert test cotacao 0 e quantidade 8', () => {
  expect(convert.convert(0, 8)).toBe(0)
})

test('converter numero recebida em string para FLOAT', () => {
  expect(convert.toMoney('10')).toBe('10.00')
})

test('converter para FLOAT', () => {
  expect(convert.toMoney(2)).toBe('2.00')
})