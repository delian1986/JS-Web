import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CreateFurnitureModel } from "./models/create-furniture.model";
import { FurnitureModel } from "./models/furniture.model";

const BASE_URL = 'http://localhost:5000/furniture/'
const CREATE = 'create'
const ALL = 'all'
const DETAILS = 'details/'
const MY = 'mine'
const DELETE = 'delete/'

@Injectable({
    providedIn: 'root'
  })

export class FurnitureService {
    constructor(
        private http: HttpClient,
        
    ) { }

    create(body: CreateFurnitureModel) {
        return this.http.post(BASE_URL + CREATE, body)
    }


    getAll() {
        return this.http.get<FurnitureModel[]>(BASE_URL + ALL)
    }

    details(id: string) {
        return this.http.get<FurnitureModel>(BASE_URL + DETAILS + id)
    }

    getMy() {
        return this.http.get<FurnitureModel[]>(BASE_URL + MY)
    }

    delete(id: string) {
        return this.http.delete(BASE_URL + DELETE + id)
    }

}