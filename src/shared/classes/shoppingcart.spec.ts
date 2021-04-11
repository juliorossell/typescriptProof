import { itemNoFound } from "../consts/itemNoFound";
import { StatusEnum } from "../enums/Status";
import { ShoppingCart } from "./shoppingcart";

describe('shoppingcart', function() {
  it('getLength', function() {
    const shoppingCart = new ShoppingCart();
    let result = shoppingCart.getLength();
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('addItem', function() {
    const shoppingCart = new ShoppingCart();
    const item = {id: 1, name: 'pelota', status : StatusEnum.IsPending, price: 10, count: 1 };
    shoppingCart.addItem(item);
    let result = shoppingCart.getLength();
    expect(result).toBeGreaterThan(0);
  });

  it('editItemById', function() {
    const shoppingCart = new ShoppingCart();
    const item = {id: 150, name: 'pelota', status : StatusEnum.IsPending, price: 10, count: 1 };
    shoppingCart.addItem(item);
    const newItem = {id: 150, name: 'pelota editada', status : StatusEnum.IsPending, price: 10, count: 1 };
    shoppingCart.editItemById(150, newItem);
    let result = shoppingCart.getLength();
    expect(result).toBeGreaterThan(0);
  });

  it('editItemById error case', function() {
    const shoppingCart = new ShoppingCart();
    const newItem = {id: 150, name: 'pelota editada', status : StatusEnum.IsPending, price: 10, count: 1 };
    expect(() => shoppingCart.editItemById(10, newItem)).toThrowError();
  });

  it('deleteItemById', function() {
    const shoppingCart = new ShoppingCart();
    const item = {id: 100, name: 'pelota', status : StatusEnum.IsPending, price: 10, count: 1 };
    shoppingCart.addItem(item);
    let result = shoppingCart.getLength();
    expect(result).toBeGreaterThan(0);
    shoppingCart.deleteItemById(100);
  });

  it('deleteItemById error case', function() {
    const shoppingCart = new ShoppingCart();
    expect(() => shoppingCart.deleteItemById(1000)).toThrowError();
  });

  it('toCompletedByItem', function() {
    const shoppingCart = new ShoppingCart();
    const item = {id: 11, name: 'pelota', status : StatusEnum.IsPending, price: 10, count: 1 };
    shoppingCart.addItem(item);
    shoppingCart.toCompletedByItem(true, 11);
    let result = shoppingCart.getLength();
    expect(result).toBeGreaterThan(0);
  });

  it('toCompletedByItem error case', function() {
    const shoppingCart = new ShoppingCart();
    expect(() =>  shoppingCart.toCompletedByItem(true, 10000)).toThrowError();
  });

  it('sortListByProperty', function() {
    const shoppingCart = new ShoppingCart();
    const item = {id: 1, name: 'pelota', status : StatusEnum.IsPending, price: 10, count: 1 };
    const secondItem = {id: 2, name: 'celular', status : StatusEnum.IsCompleted, price: 100, count: 1 };
    shoppingCart.addItem(item);
    shoppingCart.addItem(secondItem);
    shoppingCart.sortListByProperty('name');
    let result = shoppingCart.getLength();
    expect(result).toBeGreaterThan(0);
  });
});
