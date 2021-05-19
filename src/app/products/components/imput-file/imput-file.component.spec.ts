import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputFileComponent } from './imput-file.component';

describe('ImputFileComponent', () => {
  let component: ImputFileComponent;
  let fixture: ComponentFixture<ImputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImputFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
