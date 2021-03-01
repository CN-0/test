import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Post, PostsService } from '../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Output() deletePost = new EventEmitter<Post>();
  @Output() addPost = new EventEmitter<Post>();
  post:Post;
  newPostForm: FormGroup;
  image:string;
  isAddPost = false

  constructor(private postsService: PostsService) {
    this.newPostForm = new FormGroup({
      'title': new FormControl("", Validators.required),
      'userId': new FormControl("", Validators.required),
      'body': new FormControl("", Validators.required),
      'image': new FormControl(null)
    });
   }

  ngOnInit(): void {
    this.postsService.postSelected.subscribe(post=>{
      this.post = post
      this.isAddPost=false
      this.image=""
      if(post.image){
        const reader = new FileReader();
        reader.onload = () => {
          this.image = reader.result as string;
        }
        reader.readAsDataURL(post.image)
      }
    })

    this.postsService.addNewPost.subscribe(()=>{
      this.post = null
      this.image=""
      this.isAddPost=true
    })
  }

  fileAdded(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.newPostForm.patchValue({
      image: file
    });
    this.newPostForm.get('image').updateValueAndValidity()
  }

  deleteThePost():void{
    this.deletePost.emit(this.post)
    this.post = null
  }

  submit() {
    let postId =Math.round(Math.random()*10000+10)
    this.addPost.emit({...this.newPostForm.value,id:postId})
    this.isAddPost=false
  }

  ngOnDestroy():void{
    this.postsService.postSelected.unsubscribe()
  }

  
}
