import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  phoneNumbers: Array<string> = ['+359', '+971', '+972', '+198', '+701']
  professions: Array<string> = ['Manager', 'Programmer', 'HR', 'Designer']

  @ViewChild('form')
  private htmlForm: NgForm
  public model={}


  constructor() { }

  ngOnInit() {
  }

  register(){
    console.log(this.model);
    this.htmlForm.reset()
  }

}
