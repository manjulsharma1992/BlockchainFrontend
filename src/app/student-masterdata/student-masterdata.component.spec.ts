import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMasterdataComponent } from './student-masterdata.component';

describe('StudentMasterdataComponent', () => {
  let component: StudentMasterdataComponent;
  let fixture: ComponentFixture<StudentMasterdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentMasterdataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMasterdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
