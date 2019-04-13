import { Resolve, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot } from '@angular/router';
import { PostInfoModel } from 'src/app/components/shared/models/post-info.model';
import { Injectable } from '@angular/core';
import { PostService } from '../services/post.service';

@Injectable({
    providedIn:"root"
})
export class SinglePostResolver implements Resolve<PostInfoModel>{
    constructor(
        private postService:PostService
    ){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
       const id = route.params['id'];

       return this.postService.getById(id);
    }

}