import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WuutecComponent } from './wuutec.component';

describe('WuutecComponent', () => {
  let component: WuutecComponent;
  let fixture: ComponentFixture<WuutecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WuutecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WuutecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
