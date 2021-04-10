import { itemNoFound } from "../consts/itemNoFound";
import { StatusEnum } from "../enums/Status";
import { Item } from "../interfaces/Item";

export class ShoppingCart {
  public items: Item[];
  constructor() {
    this.items = [];
      // this.items = [{id: 1, name: 'pelota', status : StatusEnum.IsPending, price: 10, count: 1 }];
  }

  getLength():number {
      return this.items && this.items.length;
  }

  addItem(item: Item): void {
      //TODO: validar si el articulo ya existe, para aumentar la cantidad.
      this.items.push(item);
      console.log(this.items);
  }

  editItemById(id: number, newItem: Item): void {
      const findElement = this.items.findIndex(x => x.id === id);
      if (~findElement) {
          this.items[findElement] = newItem;
      } else {
          throw new Error(itemNoFound);
      }
  }

  deleteItemById(id: number): void {
      const findElement = this.items.findIndex(x => x.id === id);
      if (~findElement) {
          this.items.splice(findElement, 1);
          console.log(this.items);
      } else {
          throw new Error(itemNoFound);
      }
  }

  toCompletedByItem(IsCompleted:boolean, id: number): void {
      const findElement = this.items.findIndex(x => x.id === id);
      if (~findElement) {
          this.items[findElement].status = IsCompleted ? StatusEnum.IsCompleted : StatusEnum.IsPending;
          console.log(this.items);
      } else {
          throw new Error(itemNoFound);
      }
  }

  sortListByProperty(property: string): Item[] {
      const copyItems = [...this.items];
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
