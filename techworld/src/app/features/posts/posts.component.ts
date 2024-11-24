import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  searchQuery: string = '';

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.postsService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.filteredPosts = data;
      },
      error: (err) => console.error('Error fetching posts:', err),
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredPosts = this.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query)
    );
  }
}
