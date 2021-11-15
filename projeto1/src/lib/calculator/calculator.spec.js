const { sum, min } = require('./calculator');

it('deve somar 2+2 e retorna 4', () => {
  expect(sum(2, 2)).toBe(4);
});

it('deve soma 2 + 2 e se for uma string deve devolver 4', () => {
  expect(sum('2', '2')).toBe(4);
});
it('deve emitir um erro se o valor não pode ser somado', () => {
  expect(() => sum('', '2')).toThrowError();
  expect(() => sum([1, 2])).toThrowError();
  expect(() => sum({})).toThrowError();
  expect(() => sum()).toThrowError();
});

it('deve subtrair 2-2 e retorna 0', () => {
  expect(min(2, 2)).toBe(0);
});

it('deve subtrair 2 - 2 e se for uma string deve devolver 0', () => {
  expect(min('2', '2')).toBe(0);
});
it('deve emitir um erro se o valor não pode ser subtraido', () => {
  expect(() => min('', '2')).toThrowError();
  expect(() => min([1, 2])).toThrowError();
  expect(() => min({})).toThrowError();
  expect(() => min()).toThrowError();
});
