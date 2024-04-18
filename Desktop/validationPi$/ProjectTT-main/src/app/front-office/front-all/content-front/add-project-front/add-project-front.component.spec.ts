import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectFrontComponent } from './add-project-front.component';

describe('AddProjectFrontComponent', () => {
  let component: AddProjectFrontComponent;
  let fixture: ComponentFixture<AddProjectFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProjectFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
