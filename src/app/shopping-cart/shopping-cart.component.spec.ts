import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShoppingCartComponent } from './shopping-cart.component';
import { NgxsModule, Store } from '@ngxs/store';
import { ShoppingCartState } from '../store/state/shopping-cart.state';
import { AddItem, DeleteItem } from '../store/actions/shopping-cart.actions';
import { StatusEnum } from 'src/shared/enums/Status';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, NgxsModule.forRoot([ShoppingCartState])],
      declarations: [ShoppingCartComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
    ]
    });
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    component.shoppingCardForm = formBuilder.group({
        name: [null, Validators.required],
    });
    fixture.detectChanges();
  });

  it('should create', function() {
    expect(component).toBeTruthy();
  });

  it('it addItem', () => {
    const form = component.shoppingCardForm;
    const nameControl = form.get('name');
    expect(nameControl).toBeTruthy();
    expect(form.valid).toBeFalsy();
    nameControl.markAsTouched();
    expect(nameControl.touched).toBeTruthy();
    nameControl.setValue('articulo');
    expect(form.valid).toBeTruthy();
    component.addItem();
    const feed = store.selectSnapshot(state => state.shoppingCart.items);
    expect(feed.length).toBeGreaterThanOrEqual(1);
  });

  it('it deleteItem', () => {
    const newItem = {id: 150, name: 'pelota editada', status : StatusEnum.IsPending, price: 10, count: 1 };
    store.dispatch(new AddItem(newItem));
    component.deleteItem(150);
    const feed = store.selectSnapshot(state => state.shoppingCart.items);
    expect(feed.length).toBeGreaterThanOrEqual(0);
  });

  it('it toCompleted', () => {
    const newItem = {id: 111, name: 'pelota editada', status : StatusEnum.IsPending, price: 10, count: 1 };
    store.dispatch(new AddItem(newItem));
    component.toCompleted(true,111);
    const feed = store.selectSnapshot(state => state.shoppingCart.items);
    expect(feed.length).toBeGreaterThanOrEqual(1);
  });

  it('it editItem', () => {
    const newItem = {id: 1111, name: 'pelota editada', status : StatusEnum.IsPending, price: 10, count: 1 };
    store.dispatch(new AddItem(newItem));
    component.editItem(1111);
    const feed = store.selectSnapshot(state => state.shoppingCart.items);
    expect(feed.length).toBeGreaterThanOrEqual(1);
  });

  it('it sortList', () => {
    const newItem = {id: 1111, name: 'pelota editada', status : StatusEnum.IsPending, price: 10, count: 1 };
    const newItem2 = {id: 1111, name: 'pelota', status : StatusEnum.IsPending, price: 10, count: 1 };
    store.dispatch([new AddItem(newItem), new AddItem(newItem2)]);
    component.sortListByProperty('name');
    const feed = store.selectSnapshot(state => state.shoppingCart.items);
    expect(feed.length).toBeGreaterThanOrEqual(1);
  });

});


