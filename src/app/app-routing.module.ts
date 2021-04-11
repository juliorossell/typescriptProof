import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassicCodeComponent } from './classic-code/classic-code.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: 'ngxs',
    component: ShoppingCartComponent,
  },
  {
    path: 'classic',
    component: ClassicCodeComponent
  },
  {
    path: '**',
    redirectTo: 'ngxs',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
