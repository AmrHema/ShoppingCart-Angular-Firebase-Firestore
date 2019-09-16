import { ShoppingCardService } from './../Services/shopping-card.service';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../Services/products.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IshoppingCart } from '../model/IShoppingCart';
import { products } from '../interface/products-interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  categorie = '';
  cart: any;
  cart$: Observable<IshoppingCart>;
  products: products[] = [];
  productsFilteredByCategorie: products[] = [];

  subscription: Subscription;
  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute,
    private shoppingCardService: ShoppingCardService) {
    // Get All Products
    this.subscription = this.productsService.getAllProducts().subscribe((data) => {
      this.products = data.map(el => { return { id: el.payload.doc.id, ...el.payload.doc.data() } })
      this.activatedRoute.queryParamMap.subscribe((params) => {
        this.categorie = params.get('categorie');
        this.productsFilteredByCategorie = (this.categorie) ?
          this.products.filter(p => p.categorie == this.categorie) : this.products;
      })
    })


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }
}
