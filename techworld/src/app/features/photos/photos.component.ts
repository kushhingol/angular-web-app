import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PhotosService } from '../../../services/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  photos: any[] = [];
  filteredPhotos: any[] = [];
  searchControl = new FormControl('');

  constructor(private photosService: PhotosService) {}

  ngOnInit(): void {
    this.fetchPhotos();

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((query) => {
        this.filterPhotos(query || '');
      });
  }

  fetchPhotos(): void {
    this.photosService.getPhotos().subscribe((data) => {
      this.photos = data;
      this.filteredPhotos = data;
    });
  }

  filterPhotos(query: string): void {
    const lowerQuery = query.toLowerCase();
    this.filteredPhotos = this.photos.filter((photo) =>
      photo.title.toLowerCase().includes(lowerQuery)
    );
  }
}
