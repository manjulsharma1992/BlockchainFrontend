import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishDataComponent } from './publish-data.component';

describe('PublishDataComponent', () => {
  let component: PublishDataComponent;
  let fixture: ComponentFixture<PublishDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
