import { Component, OnInit, Input } from '@angular/core';
import { QuestionModel } from '../../shared/models/question.model';

@Component({
  selector: 'app-question-info',
  templateUrl: './question-info.component.html',
  styleUrls: ['./question-info.component.css']
})
export class QuestionInfoComponent implements OnInit {
  @Input()questionInfo:QuestionModel;
  date=new Date();
  
  constructor() { }

  ngOnInit() {
  }

}
