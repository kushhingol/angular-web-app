import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { CommentsService } from '../../../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments: any[] = [];
  filteredComments: any[] = [];
  searchControl = new FormControl('');

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.fetchComments();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((query) => this.filterComments(query || ''))
      )
      .subscribe((filtered) => (this.filteredComments = filtered as any));
  }

  fetchComments(): void {
    this.commentsService.getComments().subscribe((data) => {
      this.comments = data;
      this.filteredComments = data;
    });
  }

  filterComments(query: string) {
    const lowerQuery = query.toLowerCase();
    return new Promise((resolve) =>
      resolve(
        this.comments.filter(
          (comment) =>
            comment.name.toLowerCase().includes(lowerQuery) ||
            comment.email.toLowerCase().includes(lowerQuery) ||
            comment.body.toLowerCase().includes(lowerQuery)
        )
      )
    );
  }
}
