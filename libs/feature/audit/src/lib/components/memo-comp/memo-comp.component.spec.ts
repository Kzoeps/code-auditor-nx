import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoCompComponent } from './memo-comp.component';

describe('MemoCompComponent', () => {
  let component: MemoCompComponent;
  let fixture: ComponentFixture<MemoCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
