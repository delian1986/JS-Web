import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  form
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.form=this.fb.group({
      fullName:['',[Validators.required,Validators.pattern('')]],
      email:['',Validators.required,Validators.email]
    })
  }

  get formField(){
    return this.form.controls
  }

}
