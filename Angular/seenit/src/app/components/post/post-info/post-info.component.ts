import { Component, OnInit, Input } from '@angular/core';
import { PostInfoModel } from '../../shared/models/post-info.model';
import { PostService } from 'src/app/core/services/post.service';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.css']
})

export class PostInfoComponent implements OnInit {
  @Input() postInfo: PostInfoModel
  @Input() desc: string
  @Input() rank: number
  
  constructor(
    private postService:PostService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
  }

  isAuthor(post: Object) {
    return post['_acl']['creator'] === localStorage.getItem('userId');
  }

  deletePost(id: string) {
    this.postService.deletePost(id)
      .subscribe(() => {
        this.router.navigate(['/posts']);
      })
  }

}
