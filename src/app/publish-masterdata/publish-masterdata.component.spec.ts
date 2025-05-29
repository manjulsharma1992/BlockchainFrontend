import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishMasterdataComponent } from './publish-masterdata.component';

describe('PublishMasterdataComponent', () => {
  let component: PublishMasterdataComponent;
  let fixture: ComponentFixture<PublishMasterdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishMasterdataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishMasterdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
