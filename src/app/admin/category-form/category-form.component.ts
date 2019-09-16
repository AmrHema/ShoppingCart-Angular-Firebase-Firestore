import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/Services/categories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { categoryInterface } from 'src/app/interface/category-interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'categoryform',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {
  category: any = {};
  categoryID: string;

  constructor(private catService: CategoriesService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.categoryID = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.categoryID) {
      this.catService.getCategorieByID(this.categoryID).pipe(take(1)).subscribe(C => {
        if (C) { this.category = C; }
      })
    }
  }
  async save(form: NgForm) {
    //console.log(form.value);
    let title = (<categoryInterface>form.value).title;

    if (this.categoryID) {
      await this.catService.updateCategorieByID(this.categoryID, title);
      Swal.fire('BRAVO !', title + 'Categorie updated succeded !', 'success')
    }
    else {
      await this.catService.addNewcategorie(title).then(msg => {
        Swal.fire('BRAVO !', title + 'Categorie added succeded !', 'success')
      });
    }
  }

  returnCategorieAdmin() {
    this.router.navigateByUrl('/admin/categories');
  }


  async Delete() {
    if (this.categoryID) {
      await this.catService.deleteCategorieByID(this.categoryID);
      await Swal.fire('BRAVO !', ' Deleted succeded !', 'success')
    }
    this.returnCategorieAdmin();
  }
  ngOnInit() {


  }
}
