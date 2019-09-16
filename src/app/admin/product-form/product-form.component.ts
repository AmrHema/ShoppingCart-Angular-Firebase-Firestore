import { categoryInterface } from './../../interface/category-interface';
import { products } from './../../interface/products-interface';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductsService } from './../../Services/products.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoriesService } from 'src/app/Services/categories.service';
//import 'rxjs/add/operator/take';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
//  Swal from 'sweetalert2';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('imgUrl', { static: false }) imgUrl: ElementRef;

  categories: any[];
  subscription: Subscription;
  productID: string;
  product: products = {};
  constructor(private catService: CategoriesService, private productService: ProductsService,
    private router: Router, private activatedRoute: ActivatedRoute) {

    this.subscription = this.catService.getAllcategories().subscribe((data) => {
      this.categories = data.map(el => { return { id: el.payload.doc.id, ...el.payload.doc.data() } })
    })
    this.productID = this.activatedRoute.snapshot.paramMap.get('id');
    // this.productID = this.activatedRoute.snapshot.params['id'];

    if (this.productID) {
      this.productService.getProductByID(this.productID).pipe(take(1)).subscribe(p => {
        if (p) { this.product = p; }
      })


    }
  }
  returnProductAdmin() {
    this.router.navigateByUrl('/admin/products');
  }

  async save(form: NgForm) {
    let title = (<products>form.value).title,
      price = (<products>form.value).price,
      categorie = (<products>form.value).categorie,
      imgUrl: File = (<HTMLInputElement>this.imgUrl.nativeElement).files[0] ? (<HTMLInputElement>this.imgUrl.nativeElement).files[0] : null;

    if (this.productID) {
      await this.productService.updateProductByID(this.productID, title, price, categorie, imgUrl);
      Swal.fire('BRAVO !', title + ' Product updated succeded !', 'success')
    }
    else {
      await this.productService.addNewProduct(title, price, categorie, imgUrl).then(msg => {
        Swal.fire('BRAVO !', title + 'Product added succeded !', 'success')
      });
    }

  }

  async Delete() {
    if (this.productID) {
      await this.productService.deleteProductByID(this.productID);
      await Swal.fire('BRAVO !', ' Deleted succeded !', 'success')
    }
    this.returnProductAdmin();
  }

  ngOnInit() {


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
