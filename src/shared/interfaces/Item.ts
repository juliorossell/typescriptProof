import { StatusEnum } from "../enums/Status";

export interface IShoppingCart {
  items: Item[],
  getLength?(): number,
  addItem?(item: Item): void,
  deleteItemById?(id:number): void,
  toCompletedByItem?(isCompleted: boolean, id:number): void,
  sortListByProperty?(property:string): void,
}

export interface Item {
  id: number,
  name: string,
  status: StatusEnum,
  price?: number,
  count?: number,
}
