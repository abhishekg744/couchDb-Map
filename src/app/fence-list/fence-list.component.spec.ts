import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FenceListComponent } from './fence-list.component';

describe('FenceListComponent', () => {
  let component: FenceListComponent;
  let fixture: ComponentFixture<FenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
