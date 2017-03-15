/*eslint dot-notation: "off"*/
/*eslint no-shadow: "off"*/

import {replace, when} from '../../../../test-helper';

describe.only('the products controller', () => {
  let productsService;
  let ProductsController;
  let productsController;

  let makeProductsControllerWith = (productsService) => {
    ProductsController = require('./products.controller')['ProductsController'];
    productsController = new ProductsController(productsService);
  };

  beforeEach(() => {
    productsService = require('./service/products-service').productsService();
    replace(productsService, 'fetch');
    when(productsService.fetch()).thenResolve(['products']);
  });

  it('has no products', () => {
    makeProductsControllerWith(productsService);
    productsController.products.should.deepEqual([]);
  });

  it('fetches products from the server', () => {
    ProductsController = require('./products.controller')['ProductsController'];
    productsController = new ProductsController(productsService);

    return productsController.fetch().then(() => {
      productsController.products.should.deepEqual(['products']);
    });
  });
});


