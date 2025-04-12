import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAssignedBookingComponent } from './view-all-assigned-booking.component';

describe('ViewAllAssignedBookingComponent', () => {
  let component: ViewAllAssignedBookingComponent;
  let fixture: ComponentFixture<ViewAllAssignedBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllAssignedBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllAssignedBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
