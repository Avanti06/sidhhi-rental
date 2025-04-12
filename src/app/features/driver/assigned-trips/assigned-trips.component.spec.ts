import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTripsComponent } from './assigned-trips.component';

describe('AssignedTripsComponent', () => {
  let component: AssignedTripsComponent;
  let fixture: ComponentFixture<AssignedTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedTripsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
