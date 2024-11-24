import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsComponent } from './comments.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CommentsService } from '../../../services/comments.service';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let mockService: jasmine.SpyObj<CommentsService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('CommentsService', ['getComments']);
    mockService.getComments.and.returnValue(
      of([{ name: 'Test', email: 'test@example.com', body: 'Test body' }])
    );

    await TestBed.configureTestingModule({
      declarations: [CommentsComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [{ provide: CommentsService, useValue: mockService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display comments', () => {
    expect(component.comments.length).toBe(1);
    expect(component.comments[0].name).toBe('Test');
  });

  it('should filter comments based on search', () => {
    component.searchControl.setValue('Test');
    fixture.detectChanges();
    expect(component.filteredComments.length).toBe(1);
  });
});
