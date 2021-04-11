import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShoppingCart } from 'src/shared/classes/shoppingcart';
import { StatusEnum } from 'src/shared/enums/Status';
import { IShoppingCart, Item } from 'src/shared/interfaces/Item';

@Component({
  selector: 'app-classic-code',
  templateUrl: './classic-code.component.html',
  styleUrls: ['./classic-code.component.scss']
})
export class ClassicCodeComponent {
  myShoppingCard: IShoppingCart;
  shoppingCardForm: FormGroup;
  isCompleted = StatusEnum.IsCompleted;

  constructor(private fb: FormBuilder) {
    this.myShoppingCard = new ShoppingCart();
    this.createForm();
  }

  add() {
    const nameControl = this.shoppingCardForm.get('name');
    nameControl.markAsTouched();
    if (this.shoppingCardForm.valid) {
      const item: Item = {
        id: this.myShoppingCard.getLength() + 1,
        name: nameControl.value,
        status: StatusEnum.IsPending,
      }
      this.myShoppingCard.addItem(item);
      nameControl.reset();
    }
  }

  deleteItem(id: number) {
    this.myShoppingCard.deleteItemById(id);
  }

  toCompleted(IsCompleted: boolean,id: number) {
    this.myShoppingCard.toCompletedByItem(IsCompleted, id);
  }

  sortListByProperty(property: string) {
    this.myShoppingCard.sortListByProperty(property);
  }

  private createForm() {
    this.shoppingCardForm = this.fb.group({
      name: [null, Validators.required],
    });
  }


}
