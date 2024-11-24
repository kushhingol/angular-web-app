import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AlbumsService } from '../../../services/albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  albums: any[] = [];
  filteredAlbums: any[] = [];
  searchControl = new FormControl('');

  constructor(private albumsService: AlbumsService) {}

  ngOnInit(): void {
    this.fetchAlbums();

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((query) => {
        this.filterAlbums(query || '');
      });
  }

  fetchAlbums(): void {
    this.albumsService.getAlbums().subscribe((data) => {
      this.albums = data;
      this.filteredAlbums = data;
    });
  }

  filterAlbums(query: string): void {
    const lowerQuery = query.toLowerCase();
    this.filteredAlbums = this.albums.filter((album) =>
      album.title.toLowerCase().includes(lowerQuery)
    );
  }
}
