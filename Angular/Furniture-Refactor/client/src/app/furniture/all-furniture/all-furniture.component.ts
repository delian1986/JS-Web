import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { FurnitureModel } from '../models/furniture.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authentication/auth.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.css']
})
export class AllFurnitureComponent implements OnInit {
  furnitures: Observable<FurnitureModel[]>
  pageSize: number = 3
  currentPage: number = 1


  constructor(
    private furnitureService: FurnitureService,
    private router: Router,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.furnitures = this.furnitureService.getAll()
  }

  changePage(page){
    this.currentPage=page
  }

  delete(id: string) {
    this.furnitureService.delete(id).subscribe(()=>{
      this.furnitures = this.furnitures.pipe(map(f=>f.filter(f => f.id !== id)));
    })
  }


}
