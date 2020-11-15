import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFirmComponent } from './list-firm.component';

describe('ListFirmComponent', () => {
  let component: ListFirmComponent;
  let fixture: ComponentFixture<ListFirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
