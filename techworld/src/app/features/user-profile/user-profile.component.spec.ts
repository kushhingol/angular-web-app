import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UserProfileService } from '../../../services/user-profile.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let mockService: jasmine.SpyObj<UserProfileService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('UserProfileService', [
      'getUserById',
      'updateUserById',
    ]);

    mockService.getUserById.and.returnValue(
      of({
        username: 'Test User',
        email: 'test@example.com',
        dob: '1990-10-10',
        gender: 'male',
        phone: '1234567890',
        language: 'English',
        theme: 'light',
      })
    );

    await TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [{ provide: UserProfileService, useValue: mockService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save user profile data', () => {
    component.userProfileForm.patchValue({
      username: 'Updated User',
      email: 'updated@example.com',
      theme: 'light',
    });
    mockService.updateUserById.and.returnValue(
      of(component.userProfileForm.value)
    );
    component.onSave();
    expect(component.theme).toBe('light');
  });
});
