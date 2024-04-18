import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTasksComponent } from './ajout-tasks.component';

describe('AjoutTasksComponent', () => {
  let component: AjoutTasksComponent;
  let fixture: ComponentFixture<AjoutTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
