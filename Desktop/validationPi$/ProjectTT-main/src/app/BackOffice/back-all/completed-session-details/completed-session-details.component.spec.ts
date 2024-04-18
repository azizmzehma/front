import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedSessionDetailsComponent } from './completed-session-details.component';

describe('CompletedSessionDetailsComponent', () => {
  let component: CompletedSessionDetailsComponent;
  let fixture: ComponentFixture<CompletedSessionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedSessionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedSessionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
