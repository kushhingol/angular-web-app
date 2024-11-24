import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchForm!: FormGroup;
  isLoading = true;

  constructor(private fb: FormBuilder, private usersService: UsersService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchUsers();
  }

  initializeForm(): void {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });

    this.searchForm.get('searchTerm')?.valueChanges.subscribe((term) => {
      this.filterUsers(term);
    });
  }

  fetchUsers(): void {
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = data;
      this.isLoading = false;
    });
  }

  filterUsers(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredUsers = this.users;
      return;
    }
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
