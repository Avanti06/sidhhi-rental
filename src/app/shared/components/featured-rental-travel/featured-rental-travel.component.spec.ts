import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedRentalTravelComponent } from './featured-rental-travel.component';

describe('FeaturedRentalTravelComponent', () => {
  let component: FeaturedRentalTravelComponent;
  let fixture: ComponentFixture<FeaturedRentalTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedRentalTravelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedRentalTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
