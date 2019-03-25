import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { FurnitureModel } from '../models/furniture.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.css']
})
export class AllFurnitureComponent implements OnInit {
  furnitures: Observable<FurnitureModel[]>

  constructor(
    private furnitureService: FurnitureService,
    private router:Router
    ) { }

  ngOnInit() {
    this.furnitures=this.furnitureService.getAll()
        

  }



}
