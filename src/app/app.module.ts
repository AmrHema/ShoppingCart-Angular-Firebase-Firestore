import {BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UserService } from './Services/user.service';
import { AuthService } from './Services/auth.service';
import { AuthGardeService } from './Services/auth-garde.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule }   from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductsComponent } from './products/products.component';
import { ProductsAdminComponent } from './admin/products-admin/products-admin.component';
import { OrdersComponent } from './orders/orders.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { LoginComponent } from './login/login.component';
import { OrdersAdminComponent } from './admin/orders-admin/orders-admin.component';
import { AppRoutingModule } from 'src/app-routing.module';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

// import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoriesService } from './Services/categories.service';
import { ProductsService } from './Services/products.service';

import { DataTablesModule } from 'angular-datatables';
import { ProductCardComponent } from './product-card/product-card.component';
import { CatgFilterComponent } from './products/catg-filter/catg-filter.component';
import { CategoryFormComponent } from './admin/category-form/category-form.component';
import { CategoryAdminComponent } from './admin/category-admin/category-admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { MustMatchDirective } from './Services/must-match-directive.directive';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TemplatedrivenComponent } from './testcomps/templatedriven/templatedriven.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsComponent,
    ProductsAdminComponent,
    OrdersComponent,
    OrdersAdminComponent,
    ShoppingComponent,
    LoginComponent,
    ProductFormComponent,
    ProductCardComponent,
    CatgFilterComponent,
    CategoryFormComponent,
    CategoryAdminComponent,
    NotFoundComponent,
    SignInComponent,
    MustMatchDirective,
    FooterComponent,
    AboutUsComponent,
    SidebarComponent,
    TemplatedrivenComponent
  ],
  imports: [
    BrowserModule, BsDropdownModule.forRoot(),BrowserAnimationsModule,SweetAlert2Module.forRoot(),
    AppRoutingModule,FormsModule,CustomFormsModule,DataTablesModule,
    AngularFirestoreModule,AngularFireModule.initializeApp(environment.firebase),AngularFireAuthModule,AngularFireStorageModule
  ],
  schemas: [  CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService, AuthGardeService,UserService,
              CategoriesService,ProductsService,
            {provide:FirestoreSettingsToken, useValue:{}}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
