import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookwashingmachineComponent } from './bookwashingmachine.component';

describe('BookwashingmachineComponent', () => {
  let component: BookwashingmachineComponent;
  let fixture: ComponentFixture<BookwashingmachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookwashingmachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookwashingmachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
