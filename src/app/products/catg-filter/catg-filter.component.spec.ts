import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatgFilterComponent } from './catg-filter.component';

describe('CatgFilterComponent', () => {
  let component: CatgFilterComponent;
  let fixture: ComponentFixture<CatgFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatgFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatgFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
