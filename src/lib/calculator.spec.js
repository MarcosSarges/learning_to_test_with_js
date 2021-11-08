const { sum } = require("./calculator");

it("deve somar 2+2 e retorna 4", () => {
  expect(sum(2, 2)).toBe(4);
});

it("deve soma 2 + 2 e se for uma string deve devolver 4", () => {
  expect(sum("2", "2")).toBe(4);
});
it("deve emitir um erro se o valor não pode ser somado", () => {
  //   expect(sum("", "2")).toBe(4);
  expect(() => sum("", "2")).toThrowError();
  expect(() => sum([1, 2])).toThrowError();
  expect(() => sum({})).toThrowError();
  expect(() => sum()).toThrowError();
});
