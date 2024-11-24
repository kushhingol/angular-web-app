import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotosComponent } from './photos.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PhotosService } from '../../../services/photos.service';

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let mockService: jasmine.SpyObj<PhotosService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('PhotosService', ['getPhotos']);
    mockService.getPhotos.and.returnValue(
      of([
        {
          id: 1,
          title: 'Test Photo',
          thumbnailUrl: 'https://via.placeholder.com/150',
        },
      ])
    );

    await TestBed.configureTestingModule({
      declarations: [PhotosComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [{ provide: PhotosService, useValue: mockService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display photos', () => {
    expect(component.photos.length).toBe(1);
    expect(component.photos[0].title).toBe('Test Photo');
  });

  it('should filter photos based on search', () => {
    component.searchControl.setValue('Test');
    fixture.detectChanges();
    expect(component.filteredPhotos.length).toBe(1);
  });
});
