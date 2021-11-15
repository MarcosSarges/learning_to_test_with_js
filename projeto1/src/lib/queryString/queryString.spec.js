const { queryString, parser } = require('./queryString');

describe('Object to query String', () => {
  it('Deve criar a query string a partir de um objeto', () => {
    const obj = {
      name: 'Marcos',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Marcos&profession=developer');
  });
  it('Deve criar a query string mesmo se o valor for uma matriz', () => {
    const obj = {
      name: 'Marcos',
      profession: 'developer',
      attributes: ['JS', 'NextJS', 'PHP', 'RN', 'ReactJs'],
    };

    expect(queryString(obj)).toBe(
      'name=Marcos&profession=developer&attributes=JS,NextJS,PHP,RN,ReactJs',
    );
  });

  //Deep object os filhos são objetos
  it('Deve lançar um erro quando um objeto for um deep object for passado', () => {
    const obj = {
      name: 'Marcos',
      attributes: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('String to Object', () => {
  it('Deve criar objeto a partir de uma query string', () => {
    const stg = 'name=Marcos&profession=developer';

    expect(parser(stg)).toEqual({
      name: 'Marcos',
      profession: 'developer',
    });
  });
  it('Deve criar objeto a partir de uma query string com multiplos parametros', () => {
    const stg =
      'name=Marcos&profession=developer&attributes=JS,NextJS,PHP,RN,ReactJs';

    expect(parser(stg)).toEqual({
      name: 'Marcos',
      profession: 'developer',
      attributes: ['JS', 'NextJS', 'PHP', 'RN', 'ReactJs'],
    });
  });
});
