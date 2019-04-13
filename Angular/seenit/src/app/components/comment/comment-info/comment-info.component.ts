import { Component,
   OnInit, 
   Input, 
   Output, 
   EventEmitter } from '@angular/core';
import { CommentService } from 'src/app/core/services/comment.service';
import { CommentInfoModel } from '../../shared/models/comment-info.model';

@Component({
  selector: 'app-comment-info',
  templateUrl: './comment-info.component.html',
  styleUrls: ['./comment-info.component.css']
})
export class CommentInfoComponent implements OnInit {
  @Input()commentInfo:CommentInfoModel
  @Output()deleteCommentEmitter=new EventEmitter<string>();

  constructor(
    private commentService:CommentService
  ) { }

  ngOnInit() {
  }

  deleteComment(id: string) {
    this.deleteCommentEmitter.emit(id);
  }


  isAuthor(commentInfo: CommentInfoModel) {
    return commentInfo['_acl']['creator'] === localStorage.getItem('userId');
  }

}
