import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CategoriesService } from 'src/app/Services/categories.service';

@Component({
  selector: 'catgFilter',
  templateUrl: './catg-filter.component.html',
  styleUrls: ['./catg-filter.component.css']
})
export class CatgFilterComponent implements OnInit, OnDestroy {

  categories: any[];
  subscription: Subscription;
  @Input() categorie;
  constructor(private categoriesService: CategoriesService) {
    //Get All Categories
    this.subscription = this.categoriesService.getAllcategories().subscribe((data) => {
      this.categories = data.map(el => { return { id: el.payload.doc.id, ...el.payload.doc.data() } })
    })
  }

  ngOnInit() {

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
