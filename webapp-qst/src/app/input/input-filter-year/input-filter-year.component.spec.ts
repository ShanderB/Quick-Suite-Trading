import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFilterYearComponent } from './input-filter-year.component';

describe('InputFilterYearComponent', () => {
  let component: InputFilterYearComponent;
  let fixture: ComponentFixture<InputFilterYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputFilterYearComponent]
    });
    fixture = TestBed.createComponent(InputFilterYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
