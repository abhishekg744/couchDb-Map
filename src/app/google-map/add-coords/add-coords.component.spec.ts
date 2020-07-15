import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoordsComponent } from './add-coords.component';

describe('AddCoordsComponent', () => {
  let component: AddCoordsComponent;
  let fixture: ComponentFixture<AddCoordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
