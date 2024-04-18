import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListFrontComponent } from './card-listFront.component';

describe('CardListFrontComponent', () => {
  let component: CardListFrontComponent;
  let fixture: ComponentFixture<CardListFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardListFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardListFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
