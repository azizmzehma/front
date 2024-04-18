import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDetailsFrontComponent } from './session-detailsFront.component';

describe('SessionDetailsFrontComponent', () => {
  let component: SessionDetailsFrontComponent;
  let fixture: ComponentFixture<SessionDetailsFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionDetailsFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionDetailsFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
