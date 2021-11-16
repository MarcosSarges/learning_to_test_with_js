import find from 'lodash/find';
import remove from 'lodash/remove';
import Money from 'dinero.js';

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export default class Cart {
  items = [];

  constructor() {}

  add(item) {
    const itemToFind = { product: item.product };
    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }

    this.items.push(item);
  }

  remove(product) {
    remove(this.items, { product });
  }

  getTotal() {
    const _calc = (acc, item) => {
      const amount = Money({ amount: item.quantity * item.product.price });
      const discount = this._discount(amount, item);
      return acc.add(amount).subtract(discount);
    };

    return this.items.reduce(_calc, Money({ amount: 0 }));
  }

  summary() {
    const total = this.getTotal();
    const formatted = total.toFormat('$0,0.00');
    const items = this.items;

    return { total: total.getAmount(), items, formatted };
  }

  checkout() {
    const cart = this.summary();

    this.items = [];
    return cart;
  }

  _discount = (amount, { condition, quantity }) => {
    if (Array.isArray(condition)) {
      const mapped = condition =>
        this._discount(Money({ amount: amount.getAmount() }), {
          quantity,
          condition,
        });

      const [basDiscount] = condition
        .map(mapped)
        .sort((a, b) => b.getAmount() - a.getAmount());

      return basDiscount;
    }

    if (condition?.percentage && quantity >= condition?.minimum) {
      return Money({
        amount: amount.percentage(condition.percentage).getAmount(),
      });
    }

    const isEven = quantity % 2 === 0;
    if (condition?.quantity && quantity > condition.quantity) {
      return Money({ amount: amount.percentage(isEven ? 50 : 40).getAmount() });
    }

    return Money({ amount: 0 });
  };
}
