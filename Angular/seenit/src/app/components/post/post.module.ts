import { NgModule } from "@angular/core";
import { PostCreateComponent } from './post-create/post-create.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostInfoComponent } from './post-info/post-info.component';
import { PostListComponent } from './post-list/post-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommentCreateComponent } from '../comment/comment-create/comment-create.component';
import { CommentInfoComponent } from '../comment/comment-info/comment-info.component';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
    declarations:[
        PostCreateComponent,
        PostDetailsComponent,
        PostEditComponent,
        PostInfoComponent,
        PostListComponent,
        CommentCreateComponent,
        CommentInfoComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        FormsModule,
        PostRoutingModule
        ],
    exports:[
        PostCreateComponent,
        PostDetailsComponent,
        PostEditComponent,
        PostInfoComponent,
        PostListComponent,
        PostRoutingModule
        
    ]
})
export class PostModule{}