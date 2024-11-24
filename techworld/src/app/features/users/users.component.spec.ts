import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { UsersService } from '../../../services/users.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockService: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('UsersService', ['getUsers']);

    mockService.getUsers.and.returnValue(
      of([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123-456-7890',
          company: { name: 'Example Inc.' },
        },
      ])
    );

    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [{ provide: UsersService, useValue: mockService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on init', () => {
    expect(component.users.length).toBe(1);
    expect(component.users[0].name).toBe('John Doe');
  });

  it('should filter users by name', () => {
    component.searchForm.get('searchTerm')?.setValue('john');
    expect(component.filteredUsers.length).toBe(1);
  });

  it('should clear filter if search term is empty', () => {
    component.searchForm.get('searchTerm')?.setValue('');
    expect(component.filteredUsers.length).toBe(component.users.length);
  });
});
