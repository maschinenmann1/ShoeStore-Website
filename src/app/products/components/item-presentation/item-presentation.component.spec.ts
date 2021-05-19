import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPresentationComponent } from './item-presentation.component';

describe('ItemPresentationComponent', () => {
  let component: ItemPresentationComponent;
  let fixture: ComponentFixture<ItemPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
