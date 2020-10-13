import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagespacesComponent } from './managespaces.component';

describe('ManagespacesComponent', () => {
  let component: ManagespacesComponent;
  let fixture: ComponentFixture<ManagespacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagespacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagespacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
