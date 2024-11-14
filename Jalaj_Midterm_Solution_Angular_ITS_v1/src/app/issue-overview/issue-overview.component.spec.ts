import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueOverviewComponent } from './issue-overview.component';

describe('IssueOverviewComponent', () => {
  let component: IssueOverviewComponent;
  let fixture: ComponentFixture<IssueOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
