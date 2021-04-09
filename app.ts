enum StatusEnum {
    IsCompleted = 'Completado',
    IsPending = 'Pendiente'
}

interface Item {
    id: number,
    name: string,
    status: StatusEnum,
    price?: number,
    count?: number,
}
const itemNoFound = 'Elemento no encontrado';
const errorMessages : string[] = [itemNoFound];
class ShoppingCart {
    public items: Item[];
    constructor() {
        this.items = [{id: 1, name: 'pelota', status : StatusEnum.IsPending, price: 10, count: 1 }];
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

    toCompletedByItem(id: number): void {
        const findElement = this.items.findIndex(x => x.id === id);
        if (~findElement) {
            this.items[findElement].status = StatusEnum.IsCompleted;
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

function deleteItem(id: number) {
    card.deleteItemById(id);
}

function addItem(item: Item) {
    card.addItem(item);
}

function toCompleted(id: number) {
    card.toCompletedByItem(id);
}

function sortByProperty(property: string) {
    const itemSorterded = card.sortListByProperty(property);
    console.log(itemSorterded);
}

function addSonyTV() {
    const TVItem: Item = {
        id: card.getLength() + 1,
        name: 'Televisor SOny',
        price: 2000,
        status: StatusEnum.IsCompleted,
    }
    addItem(TVItem);
}

let card = new ShoppingCart();
console.log(card);