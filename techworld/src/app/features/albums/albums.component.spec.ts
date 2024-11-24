import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumsComponent } from './albums.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AlbumsService } from '../../../services/albums.service';

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;
  let mockService: jasmine.SpyObj<AlbumsService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('AlbumsService', ['getAlbums']);
    mockService.getAlbums.and.returnValue(of([{ id: 1, title: 'Test Album' }]));

    await TestBed.configureTestingModule({
      declarations: [AlbumsComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [{ provide: AlbumsService, useValue: mockService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display albums', () => {
    expect(component.albums.length).toBe(1);
    expect(component.albums[0].title).toBe('Test Album');
  });

  it('should filter albums based on search', () => {
    component.searchControl.setValue('Test');
    fixture.detectChanges();
    expect(component.filteredAlbums.length).toBe(1);
  });
});
