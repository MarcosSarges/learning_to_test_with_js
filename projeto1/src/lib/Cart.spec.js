import Cart from './Cart';

describe('Cart', () => {
  let cart = null;

  const product = {
    title: 'Adidas running shoes - men',
    price: 35388, //353.88 | 383,88
  };
  const product2 = {
    title: 'Adidas running shoes - women',
    price: 30088, //353.88 | 383,88
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal()', () => {
    it('deve retornar 0 quando getTotal é executado em uma instância recém-criada', () => {
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('deve multiplicar a quantidade e o preço e receber o valor total', () => {
      const item = {
        product: {
          title: 'Adidas running shoes - men',
          price: 35388, //353.88 | 383,88
        },
        quantity: 2, //70776
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('deve garantir que não exista mais do que no produto ao mesmo tempo', () => {
      const item1 = {
        product,
        quantity: 2, //70776
      };

      const item2 = {
        product,
        quantity: 4, //141552
      };

      cart.add(item1);

      cart.add(item2);

      expect(cart.getTotal().getAmount()).toEqual(141552);
    });

    it('should update total when a product gets included and then removed', () => {
      const item = {
        product,
        quantity: 2, //70776
      };

      const item2 = {
        product: product2,
        quantity: 2, //60176
      };

      cart.add(item);

      expect(cart.getTotal().getAmount()).toEqual(
        item.product.price * item.quantity,
      );

      cart.add(item2);

      cart.remove(product);

      expect(cart.getTotal().getAmount()).toEqual(
        item2.product.price * item2.quantity,
      );
    });
  });

  describe('checkout', () => {
    it('deve retornar um objeto com o total da compra e a lista de itens', () => {
      const item = {
        product,
        quantity: 10,
      };
      const item2 = {
        product: product2,
        quantity: 15,
      };

      cart.add(item);
      cart.add(item2);

      expect(cart.checkout()).toMatchSnapshot();
    });
    it('deve retornar um objeto com final da compra e limpar o carrinho', () => {
      cart.add({ product, quantity: 10 });

      cart.checkout();
      expect(cart.getTotal().getAmount()).toEqual(0);
    });

    it('deve retornar um objeto o resumo da compra e não limpar o carrinho', () => {
      const item = {
        product,
        quantity: 10,
      };
      const item2 = {
        product: product2,
        quantity: 15,
      };

      cart.add(item);
      cart.add(item2);

      expect(cart.summary()).toMatchSnapshot();

      expect(cart.getTotal().getAmount()).toEqual(805200);
    });
    it('deve retornar um objeto o resumo da compra com valores formatados', () => {
      const item = {
        product,
        quantity: 10,
      };
      const item2 = {
        product: product2,
        quantity: 15,
      };

      cart.add(item);
      cart.add(item2);

      expect(cart.summary().formatted).toEqual('R$8,052.00');
    });
  });

  describe('Condições especiais', () => {
    it('deve aplicar uma desconto em porcentagem de acordo com a quantidade ', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 3,
      });

      expect(cart.getTotal().getAmount()).toEqual(74315);
    });

    it('deve aplicar um desconto de leve 4 e page 2 ', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 4,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });
    it('deve aplicar um desconto for para quantidades ímpares', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('deve aplicar o melhor desconto', () => {
      const condition1 = {
        quantity: 2,
      };

      const condition2 = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('deve aplicar o melhor desconto', () => {
      const condition1 = {
        quantity: 2,
      };

      const condition2 = {
        percentage: 80,
        minimum: 2,
      };

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });
  });
});
