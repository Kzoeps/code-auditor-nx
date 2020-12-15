import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditDetailComponent } from './audit-detail.component';

describe('AuditDetailComponent', () => {
  let component: AuditDetailComponent;
  let fixture: ComponentFixture<AuditDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
