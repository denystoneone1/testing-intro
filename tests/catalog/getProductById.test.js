const products = require('../../src/data/products');
const { getProductById } = require('../../src/catalog');

describe('getProductById', () => {
  test('ID 1 возвращает products[0]', () => {
    expect(getProductById(products, 1)).toBe(products[0]);
  });

  test('ID 4 возвращает products[3]', () => {
    expect(getProductById(products, 4)).toBe(products[3]);
  });

  test('ID 6 возвращает products[5]', () => {
    expect(getProductById(products, 6)).toBe(products[5]);
  });
  test.todo('ID 0 возвращает null');
  test.todo('ID 999 возвращает null');
  test.todo('ID -1 возвращает null');
  test.todo("строковый ID '1' возвращает null");
  test.todo('ID undefined возвращает null');
  test.todo('ID NaN возвращает null');
});
