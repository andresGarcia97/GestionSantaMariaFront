import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowdishwashingComponent } from './showdishwashing.component';

describe('ShowdishwashingComponent', () => {
  let component: ShowdishwashingComponent;
  let fixture: ComponentFixture<ShowdishwashingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowdishwashingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowdishwashingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
