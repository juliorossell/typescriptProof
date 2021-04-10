import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Item } from 'src/shared/interfaces/Item';
import { StatusEnum } from 'src/shared/enums/Status';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', function() {
    expect(component).toBeTruthy();
  });

  it('should addItem', async () => {
    const form = component.shoppingCardForm;
    expect(form.valid).toBeFalsy();
    const nameControl = form.get('name');
    expect(nameControl).toBeTruthy();
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
    nameControl.reset();
    expect(nameControl.value).toBeNull();
  });

  // it('should addItem', async () => {
  //   myShoppingCard.addItem(mock);
  // });

  it('should deleteItem', async () => {
    const id = 1;
    // component.deleteItem(id);
    component.myShoppingCard.deleteItemById(id);
  });

  it('should toCompleted', async () => {
    const id = 1;
    // component.toCompleted(true,id);
    component.myShoppingCard.toCompletedByItem(true, id);
  });

});


