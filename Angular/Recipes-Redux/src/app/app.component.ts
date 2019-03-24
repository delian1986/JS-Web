import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyBQ4V-8zanlEnl6AEyGF1Nbz9aUeoQ7fjc",
      authDomain: "ccccc-61656.firebaseapp.com"
    })
  }

  title = 'app';
}
