import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
    private querySource = new BehaviorSubject<string>('')
    currentQuery = this.querySource.asObservable()

    constructor() { }

    changeQuery(query: string) {
        // debugger
        this.querySource.next(query)
    }
}    
