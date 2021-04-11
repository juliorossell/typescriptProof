import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { StatusEnum } from 'src/shared/enums/Status';
import { IShoppingCart, Item } from 'src/shared/interfaces/Item';
import { AddItem, DeleteItem, EditItem, SortList, ToCompleted } from '../actions/shopping-cart.actions';

@State<IShoppingCart>({
  name: 'shoppingCart',
  defaults: {
    items: [],
  }
})

@Injectable()
export class ShoppingCartState {
  @Action(AddItem)
  addItemNGXS(ctx: StateContext<IShoppingCart>, payload: AddItem) {
    const state = ctx.getState();
    const newItem = {...payload.item };
    newItem.id = state.items.length + 1;
    ctx.setState({
      ...state,
      items: [
        ...state.items,
        newItem
      ]
    });
  }

  @Action(EditItem)
  editItemNGXS(ctx: StateContext<IShoppingCart>, payload: any) {
    const state = ctx.getState();
    let arrayCopy = [...state.items];
    const findElement = arrayCopy.findIndex(x => x.id === payload.id);
    const newItem = {...payload.newItem };
    newItem.id = state.items.length + 1;
    if (~findElement) {
      arrayCopy[findElement] = newItem;
      ctx.setState({items: arrayCopy});
    }
  }

  @Action(ToCompleted)
  toCompletedItemNGXS(ctx: StateContext<IShoppingCart>, payload: any) {
    const state = ctx.getState();
    let arrayCopy = [...state.items];
    const findIndexElement = arrayCopy.findIndex(x => x.id === payload.id);
    if (~findIndexElement) {
      const newItem = {...arrayCopy[findIndexElement] };
      newItem.status = payload.isCompleted ? StatusEnum.IsCompleted : StatusEnum.IsPending;
      arrayCopy[findIndexElement] = newItem;
      ctx.setState({items: arrayCopy});
    }
  }

  @Action(DeleteItem)
  deleteItemNGXS(ctx: StateContext<IShoppingCart>, payload: any) {
    const state = ctx.getState();
    let arrayCopy = [...state.items];
    const findElement = arrayCopy.findIndex(x => x.id === payload.id);
    if (~findElement) {
      arrayCopy.splice(findElement, 1);
      ctx.setState({items: arrayCopy});
    }
  }


  @Action(SortList)
  sortListNGXS(ctx: StateContext<IShoppingCart>, payload: any) {
    const state = ctx.getState();
    let sortList = this.sortListByProperty(payload.keyword,  state.items)
    ctx.setState({items: sortList});
  }

  sortListByProperty(property: string, items: Item[]): Item[] {
    const copyItems = [...items];
    copyItems.sort((a, b) => {
      if (a[property] < b[property]) {
        return -1;
      }
      if (a[property] > b[property]) {
        return 1;
      }
      return 0;
    });
    return copyItems;
  }

}
