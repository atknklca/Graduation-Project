import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRestaurantComponent } from './user-restaurant.component';

describe('UserRestaurantComponent', () => {
  let component: UserRestaurantComponent;
  let fixture: ComponentFixture<UserRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
