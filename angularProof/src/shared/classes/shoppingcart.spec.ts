import { StatusEnum } from "../enums/Status";
import { ShoppingCart } from "./shoppingcart";

describe('shoppingcart', function() {
  const shoppingCart = new ShoppingCart();
  it('getLength', function() {
    let result = shoppingCart.getLength();
    expect(result).toEqual(0);
  });

  it('addItem', function() {
    const item = {id: 1, name: 'pelota', status : StatusEnum.IsPending, price: 10, count: 1 };
    shoppingCart.addItem(item);
    let result = shoppingCart.getLength();
    expect(result).toBeGreaterThan(0);
  });

  it('editItemById', function() {
    const newItem = {id: 1, name: 'pelota', status : StatusEnum.IsPending, price: 10, count: 1 };
    shoppingCart.addItem(newItem);
    let result = shoppingCart.getLength();
    expect(result).toBeGreaterThan(0);
  });
});
