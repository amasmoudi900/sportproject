import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesTableComponent } from './matches-table.component';

describe('MatchesTableComponent', () => {
  let component: MatchesTableComponent;
  let fixture: ComponentFixture<MatchesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
