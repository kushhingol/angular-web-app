import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from '../../../services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userProfileForm!: FormGroup;
  isLoading = true;
  userId = ''; // Assume user ID is retrieved from auth
  theme: string = 'light'; // Default theme

  constructor(
    private fb: FormBuilder,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchUserProfile();
  }

  initializeForm(): void {
    this.userProfileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      language: ['English', Validators.required],
      theme: ['light', Validators.required],
    });
  }

  fetchUserProfile(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User ID not found!');
      return;
    }
    this.userId = userId;
    this.userProfileService.getUserById(this.userId).subscribe((data) => {
      this.userProfileForm.patchValue(data);
      this.theme = data.theme;
      this.isLoading = false;
    });
  }

  onSave(): void {
    if (this.userProfileForm.valid) {
      this.userProfileService
        .updateUserById(this.userId, this.userProfileForm.value)
        .subscribe(
          (updatedData) => {
            alert('Profile updated successfully!');
            this.theme = updatedData.theme;
            localStorage.setItem('theme', this.theme);
            document.body.setAttribute('data-theme', this.theme);
          },
          (error) => {
            alert('Error updating profile.');
          }
        );
    }
  }
}
