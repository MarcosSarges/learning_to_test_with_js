const { queryString } = require('./queryString');

describe('Object to query String', () => {
  it('Deve criar a query string a partir de um objeto', () => {
    const obj = {
      name: 'Marcos',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Marcos&profession=developer');
  });
});
