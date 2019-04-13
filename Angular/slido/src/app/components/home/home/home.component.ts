import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  eventForm:FormGroup

  constructor(
    private fb:FormBuilder,
    private eventService:EventService
  ) { }

  ngOnInit() {
    this.eventForm=this.fb.group({
      code:[null,[Validators.required]]
    });
  }
  
  displayLiveEvent(){
    const code=this.eventForm.value.code;
    this.eventService.fetchEventCode(code);
  }
}
