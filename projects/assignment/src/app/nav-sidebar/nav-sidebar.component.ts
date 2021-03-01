import { Component, Input, OnInit } from '@angular/core';
import { Post, PostsService } from '../posts.service';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.css']
})
export class NavSidebarComponent implements OnInit {

  @Input() posts: Post[];
  activeId = 0;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
  }

  setActive(id:number):void{
    this.activeId = id;
    let activePost = this.posts.find(item=>item.id===id)
    this.postsService.postSelected.next(activePost)
  }

  addPost():void{
    console.log("add")
    this.postsService.addNewPost.next()
    console.log("adddd")
  }

}
