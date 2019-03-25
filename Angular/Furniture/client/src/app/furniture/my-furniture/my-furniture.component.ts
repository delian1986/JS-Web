import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FurnitureModel } from '../models/furniture.model';
import { FurnitureService } from '../furniture.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-furniture',
  templateUrl: './my-furniture.component.html',
  styleUrls: ['./my-furniture.component.css']
})
export class MyFurnitureComponent implements OnInit {
  myFurnitures: Observable<FurnitureModel[]>

  constructor(
    private furnitureService: FurnitureService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadMyFurnitures()
  }

  delete(id: string) {
    this.furnitureService.delete(id).subscribe(()=>{
      this.myFurnitures = this.myFurnitures.pipe(map(f=>f.filter(f => f.id !== id)));
    })
  }

  private loadMyFurnitures() {
    this.myFurnitures = this.furnitureService.getMy()
  }

}
