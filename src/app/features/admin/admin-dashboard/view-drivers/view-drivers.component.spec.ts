import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDriversComponent } from './view-drivers.component';

describe('ViewDriversComponent', () => {
  let component: ViewDriversComponent;
  let fixture: ComponentFixture<ViewDriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDriversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
