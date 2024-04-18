import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectFrontComponent } from './update-project-front.component';

describe('UpdateProjectFrontComponent', () => {
  let component: UpdateProjectFrontComponent;
  let fixture: ComponentFixture<UpdateProjectFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProjectFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProjectFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
