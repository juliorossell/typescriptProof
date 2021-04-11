import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { StatusEnum } from 'src/shared/enums/Status';
import { IShoppingCart, Item } from 'src/shared/interfaces/Item';
import { AddItem, DeleteItem, EditItem, SortList, ToCompleted } from '../store/actions/shopping-cart.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  shoppingCardForm: FormGroup;
  isCompleted = StatusEnum.IsCompleted;
  shoppingCartList$: Observable<IShoppingCart>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.createForm();
    this.shoppingCartList$ = this.store.select(state => state.shoppingCart.items);
  }

  private createForm() {
    this.shoppingCardForm = this.fb.group({
      name: [null, Validators.required],
    });
  }

  addItem() {
    const nameControl = this.shoppingCardForm.get('name');
    nameControl.markAsTouched();
    if (this.shoppingCardForm.valid) {
      const item: Item = {
        name: nameControl.value,
        status: StatusEnum.IsPending,
      }
      this.store.dispatch(new AddItem(item));
      nameControl.reset();
    }
  }

  deleteItem(id: number) {
    this.store.dispatch(new DeleteItem(id));
  }

  toCompleted(IsCompleted: boolean,id: number) {
    this.store.dispatch(new ToCompleted(IsCompleted, id));
  }

  editItem(id: number) {
    const newItem = {name: 'item editado', status : StatusEnum.IsPending };
    this.store.dispatch(new EditItem(id, newItem));
  }

  sortListByProperty(property: string) {
    this.store.dispatch(new SortList(property));
  }


}
