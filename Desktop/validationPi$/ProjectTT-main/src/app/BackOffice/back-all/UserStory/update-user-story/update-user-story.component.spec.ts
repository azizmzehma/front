import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserStoryComponent } from './update-user-story.component';

describe('UpdateUserStoryComponent', () => {
  let component: UpdateUserStoryComponent;
  let fixture: ComponentFixture<UpdateUserStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserStoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
