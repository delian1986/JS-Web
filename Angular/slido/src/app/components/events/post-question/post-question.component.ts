import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})
export class PostQuestionComponent implements OnInit {
  postQuestionForm:FormGroup

  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.postQuestionForm=this.fb.group({
      text:['',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(70)
      ]
    ]
    });
  }

}
