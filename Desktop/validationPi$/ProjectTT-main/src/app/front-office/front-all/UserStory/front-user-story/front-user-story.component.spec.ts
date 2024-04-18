import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontUserStoryComponent } from './front-user-story.component';

describe('FrontUserStoryComponent', () => {
  let component: FrontUserStoryComponent;
  let fixture: ComponentFixture<FrontUserStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontUserStoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontUserStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
