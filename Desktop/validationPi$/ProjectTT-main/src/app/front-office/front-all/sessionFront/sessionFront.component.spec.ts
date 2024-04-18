import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionFrontComponent } from './sessionFront.component';

describe('SessionFrontComponent', () => {
  let component: SessionFrontComponent;
  let fixture: ComponentFixture<SessionFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
