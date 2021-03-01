import { Component,OnInit } from '@angular/core';
import { Post, PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment';
  posts: Post[];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(res=>{
      this.posts = res.slice(0,8)
    })
  }

  onDeletePost(post:Post):void{
    this.posts = this.posts.filter(item=> item!==post)
  }

  onAddPost(post:Post):void{
    this.posts.push(post)
  }
}
