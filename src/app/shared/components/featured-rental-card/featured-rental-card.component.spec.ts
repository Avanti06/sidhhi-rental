import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedRentalCardComponent } from './featured-rental-card.component';

describe('FeaturedRentalCardComponent', () => {
  let component: FeaturedRentalCardComponent;
  let fixture: ComponentFixture<FeaturedRentalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedRentalCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedRentalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
