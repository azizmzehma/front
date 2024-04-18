import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFrontDetailsComponent } from './project-front-details.component';

describe('ProjectFrontDetailsComponent', () => {
  let component: ProjectFrontDetailsComponent;
  let fixture: ComponentFixture<ProjectFrontDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectFrontDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectFrontDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
