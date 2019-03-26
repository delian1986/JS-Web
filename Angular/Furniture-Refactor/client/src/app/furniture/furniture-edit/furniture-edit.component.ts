import { Component, OnInit } from '@angular/core';
import { FurnitureModel } from '../models/furniture.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FurnitureService } from '../furniture.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-furniture-edit',
  templateUrl: './furniture-edit.component.html',
  styleUrls: ['./furniture-edit.component.css']
})
export class FurnitureEditComponent implements OnInit {
  
  bindingModel:FurnitureModel
  id:string

  constructor(
    private route:ActivatedRoute,
    private furnitureService:FurnitureService,
    private router:Router,
    private toastr:ToastrService
  ) {
    this.id=this.route.snapshot.params['id']
   }

  ngOnInit() {
    this.furnitureService.getFurnitureById(this.id)
    .subscribe((data)=>{
      this.bindingModel=data
    })
  }
  edit(){
    this.furnitureService.editFurniture(this.id,this.bindingModel).subscribe()
    this.router.navigate(['furniture/all'])
    this.toastr.success(`${this.bindingModel.make} edited!`)
  }

}
