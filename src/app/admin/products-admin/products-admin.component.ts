import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();




  products: any[];
  productsFiltered: any[];
  Subscrib: Subscription;
  constructor(private productsService: ProductsService) {
    this.Subscrib = this.productsService.getAllProducts().subscribe((data) => {
      this.products = data.map(el => { return { id: el.payload.doc.id, ...el.payload.doc.data() } })
      this.productsFiltered = this.products;
      this.dtTrigger.next();
    })


  
  }
  filter(querystring: string) {
    if (querystring) {
      this.productsFiltered = this.products.filter(p =>
        p.title.toLowerCase().includes(querystring.toLowerCase()));
    }
    else {
      this.productsFiltered = this.products;


    }
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength:5
    };
  };

  ngOnDestroy(): void {
    this.Subscrib.unsubscribe();
     // Do not forget to unsubscribe the event
     this.dtTrigger.unsubscribe();
  }

}
