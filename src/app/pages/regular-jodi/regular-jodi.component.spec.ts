import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularJodiComponent } from './regular-jodi.component';

describe('RegularJodiComponent', () => {
  let component: RegularJodiComponent;
  let fixture: ComponentFixture<RegularJodiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegularJodiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegularJodiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
