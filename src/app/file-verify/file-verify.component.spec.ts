import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileVerifyComponent } from './file-verify.component';

describe('FileVerifyComponent', () => {
  let component: FileVerifyComponent;
  let fixture: ComponentFixture<FileVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileVerifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
