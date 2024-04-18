import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedSessionDetailsFrontComponent } from './completed-session-detailsFront.component';

describe('CompletedSessionDetailsFrontComponent', () => {
  let component: CompletedSessionDetailsFrontComponent;
  let fixture: ComponentFixture<CompletedSessionDetailsFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedSessionDetailsFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedSessionDetailsFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
