import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../../services/posts.service';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let postsService: PostsService;

  const mockPosts = [
    { id: 1, title: 'First Post', body: 'This is the first post.' },
    { id: 2, title: 'Second Post', body: 'This is the second post.' },
    { id: 3, title: 'Another Post', body: 'This post is about Angular.' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [PostsService],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    postsService = TestBed.inject(PostsService);

    spyOn(postsService, 'getPosts').and.returnValue(of(mockPosts));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on initialization', () => {
    expect(postsService.getPosts).toHaveBeenCalled();
    expect(component.posts.length).toBe(3);
    expect(component.filteredPosts.length).toBe(3);
  });

  it('should filter posts based on search query', () => {
    component.searchQuery = 'first';
    component.onSearch();
    expect(component.filteredPosts.length).toBe(1);
    expect(component.filteredPosts[0].title).toBe('First Post');

    component.searchQuery = 'post';
    component.onSearch();
    expect(component.filteredPosts.length).toBe(3);
  });

  it('should show all posts if search query is empty', () => {
    component.searchQuery = '';
    component.onSearch();
    expect(component.filteredPosts.length).toBe(3);
  });
});
