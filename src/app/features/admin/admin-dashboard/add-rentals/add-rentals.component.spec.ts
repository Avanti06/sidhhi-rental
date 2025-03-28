import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRentalsComponent } from './add-rentals.component';

describe('AddRentalsComponent', () => {
  let component: AddRentalsComponent;
  let fixture: ComponentFixture<AddRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRentalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
