import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';


export interface Post {
    userId:number;
    title:string;
    body:string;
    id:number;
    image?:File;
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  postSelected = new Subject<Post>();

  addNewPost = new Subject();

  constructor(private http: HttpClient) {}

  getPosts(): any{
    return this.http
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }
}
