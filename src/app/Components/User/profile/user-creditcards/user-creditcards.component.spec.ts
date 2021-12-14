import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreditcardsComponent } from './user-creditcards.component';

describe('UserCreditcardsComponent', () => {
  let component: UserCreditcardsComponent;
  let fixture: ComponentFixture<UserCreditcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreditcardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreditcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
