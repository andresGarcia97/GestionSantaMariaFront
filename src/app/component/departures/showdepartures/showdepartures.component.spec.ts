import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowdeparturesComponent } from './showdepartures.component';

describe('ShowdeparturesComponent', () => {
  let component: ShowdeparturesComponent;
  let fixture: ComponentFixture<ShowdeparturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowdeparturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowdeparturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
