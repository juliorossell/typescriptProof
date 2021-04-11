import { Item } from "src/shared/interfaces/Item";

export class AddItem {
  static readonly type = '[Todo] Add';
  constructor(public item: Item) {}
}

export class EditItem {
  static readonly type = '[Todo] Edit';
  constructor(public id: number, public newItem: Item) {}
}

export class ToCompleted {
  static readonly type = '[Todo] Update Status';
  constructor(public isCompleted: boolean, public id: number) {}
}

export class  DeleteItem {
  static readonly type = '[Todo] Delete';
  constructor(public id: number) {}
}

export class  SortList {
  static readonly type = '[Todo] Sort';
  constructor(public keyword: string) {}
}
