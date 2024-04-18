import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCreateFrontComponent } from './session-createFront.component';

describe('SessionCreateFrontComponent', () => {
  let component: SessionCreateFrontComponent;
  let fixture: ComponentFixture<SessionCreateFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionCreateFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionCreateFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
