import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppComponent } from './app.component';
import { Item } from 'src/shared/interfaces/Item';
import { StatusEnum } from 'src/shared/enums/Status';
import { ShoppingCart } from 'src/shared/classes/shoppingcart';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
   const formBuilder: FormBuilder = new FormBuilder();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: FormBuilder, useValue: formBuilder }
    ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.myShoppingCard = new ShoppingCart();
    component.shoppingCardForm = formBuilder.group({
        name: [null, Validators.required],
    });
    fixture.detectChanges();
  });

  it('should create', function() {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.shoppingCardForm.controls.name.setValue('');
    expect(component.shoppingCardForm.valid).toBeFalsy();
  });

  it('should validation Name Form', () => {
    const name = component.shoppingCardForm.controls.name;
    expect(name.valid).toBeFalsy();
    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();
  });

  it('form should be valid', () => {
    component.shoppingCardForm.controls.name.setValue('articulo');
    expect(component.shoppingCardForm.valid).toBeTruthy();
  });

  it('should add', async () => {
    const form = component.shoppingCardForm;
    const nameControl = form.get('name');
    expect(nameControl).toBeTruthy();
    expect(form.valid).toBeFalsy();
    nameControl.markAsTouched();
    expect(nameControl.touched).toBeTruthy();
    nameControl.setValue('articulo');
    expect(form.valid).toBeTruthy();
    const item: Item = {
      id: component.myShoppingCard.getLength() + 1,
      name: nameControl.value,
      status: StatusEnum.IsPending,
    }
    component.myShoppingCard.addItem(item);
    let result = component.myShoppingCard.getLength();
    expect(result).toBeGreaterThan(0);
    nameControl.reset();
    expect(nameControl.value).toBeNull();
  });

  it('should deleteItem', async () => {
    const item = {id: 2, name: 'pelota', status : StatusEnum.IsPending, price: 10, count: 1 };
    component.myShoppingCard.addItem(item);
    let result = component.myShoppingCard.getLength();
    expect(result).toBeGreaterThan(0);
    component.deleteItem(2);
  });

  it('should toCompleted', async () => {
    const item = {id: 3, name: 'pelota', status : StatusEnum.IsPending, price: 10, count: 1 };
    component.myShoppingCard.addItem(item);
    component.toCompleted(true, 3);
    let result = component.myShoppingCard.getLength();
    expect(result).toBeGreaterThan(0);
  });

});


