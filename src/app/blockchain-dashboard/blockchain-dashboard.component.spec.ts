import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainDashboardComponent } from './blockchain-dashboard.component';

describe('BlockchainDashboardComponent', () => {
  let component: BlockchainDashboardComponent;
  let fixture: ComponentFixture<BlockchainDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockchainDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockchainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
