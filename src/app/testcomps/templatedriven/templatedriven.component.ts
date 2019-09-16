import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { products } from 'src/app/interface/products-interface';

@Component({
  selector: 'app-templatedriven',
  templateUrl: './templatedriven.component.html',
  styleUrls: ['./templatedriven.component.css']
})
export class TemplatedrivenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  save(form:NgForm) {
    let title =  (form.value).title;
    console.log('title : '+ title);
  }

  reset(f:NgForm) {
    f.reset({ title:'amr Hema'});
 //   f.setValue({  title:'amr Hema',email:'email'});
  }
}
