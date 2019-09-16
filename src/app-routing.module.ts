import { AboutUsComponent } from './app/about-us/about-us.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './app/products/products.component';
import { OrdersComponent } from './app/orders/orders.component';
import { ProductsAdminComponent } from './app/admin/products-admin/products-admin.component';
import { OrdersAdminComponent } from './app/admin/orders-admin/orders-admin.component';
import { LoginComponent } from './app/login/login.component';
import { ShoppingComponent } from './app/shopping/shopping.component';

// for AngularFireDatabase Authentication
import { AngularFireModule } from 'angularfire2';
// for AngularFirestore
import { AngularFirestoreModule } from '@angular/fire/firestore';
// for AngularFireAuth
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from './environments/environment';
import { AuthGardeService } from './app/Services/auth-garde.service';
import { AdminAuthGuardService } from './app/Services/admin-auth-guard.service';
import { ProductFormComponent } from './app/admin/product-form/product-form.component';
import { CategoryFormComponent } from './app/admin/category-form/category-form.component';
import { CategoryAdminComponent } from './app/admin/category-admin/category-admin.component';
import { NotFoundComponent } from './app/not-found/not-found.component';
import { SignInComponent } from './app/sign-in/sign-in.component';
import { SidebarComponent } from './app/sidebar/sidebar.component';


const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full', data: { index: 0 } },
  { path: 'login', component: LoginComponent, data: { index: 1 } },
  { path: 'signIn', component: SignInComponent, data: { index: 2 } },
  { path: 'products', component: ProductsComponent, data: { index: 3 } },
  { path: 'orders', component: OrdersComponent, data: { index: 4 } },
  { path: 'admin/products', component: ProductsAdminComponent, data: { index: 5 } },
  { path: 'admin/products/new', component: ProductFormComponent, data: { index: 6 } },
  { path: 'admin/products/:id', component: ProductFormComponent, data: { index: 6 } },
  { path: 'admin/categories', component: CategoryAdminComponent, data: { index: 7 } },
  { path: 'admin/categories/new', component: CategoryFormComponent, data: { index: 8 } },
  { path: 'admin/categories/:id', component: CategoryFormComponent, data: { index: 9 } },
  { path: 'admin/orders', component: OrdersAdminComponent, data: { index: 10 } },
  { path: 'shopping', component: ShoppingComponent, canActivate: [AuthGardeService], data: { index: 11 } },
  { path: 'aboutUs', component: AboutUsComponent,  data: { index: 12 } },
  { path: 'sideBar', component: SidebarComponent,  data: { index: 13 } },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  AngularFireModule.initializeApp(environment.firebase, 'my-app'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
