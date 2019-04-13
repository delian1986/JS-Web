import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../../../core/services/comment.service';
import { PostService } from 'src/app/core/services/post.service';
import { PostInfoModel } from '../../shared/models/post-info.model';
import { CommentInfoModel } from '../../shared/models/comment-info.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: PostInfoModel;
  comments$: Observable<CommentInfoModel[]>;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.post = this.route.snapshot.data['post'];
    this.comments$ = this.commentService.getAllForPost(this.id);
  }

  postComment(body) {
    this.commentService
      .postComment(body)
      .subscribe((data) => {
        this.loadComments()
        console.log(data);
      })
  }

  loadComments() {
    this.comments$ = this.commentService.getAllForPost(this.id)
  }

  deleteComment(id: string) {
    this.commentService.deleteComment(id)
      .subscribe(() => {
        this.loadComments()
      })
  }

  deletePost(id: string) {
    this.postService.deletePost(id)
      .subscribe(() => {
        this.router.navigate(['/posts']);
      })
  }
}
