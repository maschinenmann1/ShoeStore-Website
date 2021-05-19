import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparedItemComponent } from './compared-item.component';

describe('ComparedItemComponent', () => {
  let component: ComparedItemComponent;
  let fixture: ComponentFixture<ComparedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
