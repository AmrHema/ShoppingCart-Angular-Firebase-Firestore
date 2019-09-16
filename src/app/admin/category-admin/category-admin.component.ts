import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/Services/categories.service';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  categories: any[];
  categsFiltered: any[];
  Subscrib: Subscription;
  
  constructor(private categoriesService: CategoriesService) { 
    this.Subscrib = this.categoriesService.getAllcategories().subscribe((data) => {
      this.categories = data.map(el => { return { id: el.payload.doc.id, ...el.payload.doc.data() } })
      this.categsFiltered = this.categories;
      this.dtTrigger.next();
    })
    
  }

  filter(querystring: string) {
    if (querystring) {
      this.categsFiltered = this.categories.filter(p =>
        p.title.toLowerCase().includes(querystring.toLowerCase()));
    }
    else {
      this.categsFiltered = this.categories;


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
