import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStarlineComponent } from './home-starline.component';

describe('HomeStarlineComponent', () => {
  let component: HomeStarlineComponent;
  let fixture: ComponentFixture<HomeStarlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeStarlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeStarlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
