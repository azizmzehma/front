import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageFrontComponent } from './home-page-front.component';

describe('HomePageFrontComponent', () => {
  let component: HomePageFrontComponent;
  let fixture: ComponentFixture<HomePageFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
