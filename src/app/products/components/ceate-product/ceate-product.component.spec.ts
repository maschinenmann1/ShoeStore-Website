import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeateProductComponent } from './ceate-product.component';

describe('CeateProductComponent', () => {
  let component: CeateProductComponent;
  let fixture: ComponentFixture<CeateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeateProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
