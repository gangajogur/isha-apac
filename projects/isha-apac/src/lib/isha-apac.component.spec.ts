import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IshaApacComponent } from './isha-apac.component';

describe('IshaApacComponent', () => {
  let component: IshaApacComponent;
  let fixture: ComponentFixture<IshaApacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IshaApacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IshaApacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
