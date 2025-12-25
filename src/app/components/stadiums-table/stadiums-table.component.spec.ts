import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumsTableComponent } from './stadiums-table.component';

describe('StadiumsTableComponent', () => {
  let component: StadiumsTableComponent;
  let fixture: ComponentFixture<StadiumsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StadiumsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StadiumsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
