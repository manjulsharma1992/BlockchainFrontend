import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedCubeComponent } from './animated-cube.component';

describe('AnimatedCubeComponent', () => {
  let component: AnimatedCubeComponent;
  let fixture: ComponentFixture<AnimatedCubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedCubeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
