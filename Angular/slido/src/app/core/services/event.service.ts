import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SlidoLiveEvent } from 'src/app/components/shared/models/live-event.model';
import { map } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { QuestionModel } from 'src/app/components/shared/models/question.model';
import { SlidoEvent } from 'src/app/components/shared/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _liveEvent: SlidoLiveEvent;
  private _liveQuestion: QuestionModel[] = [];
  private _liveAllEvents: SlidoEvent[];

  liveEventChange = new Subject<SlidoLiveEvent>();
  liveEventQuestionsChanged = new Subject<QuestionModel[]>();
  allEventsChanged = new Subject<SlidoEvent[]>();

  constructor(
    private afDb: AngularFirestore,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  fetchEventCode(eventCode: string) {
    this.afDb
      .collection<SlidoLiveEvent>('events',
        (ref) => ref.where('code', '==', eventCode).limit(1))
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            }
          })
        })
      )
      .subscribe((data) => {
        if (data.length > 0) {
          this._liveEvent = data[0];
          this.liveEventChange.next({ ...this._liveEvent });
          this.router.navigate(['event', this._liveEvent.id, 'live'])
        } else {
          this.snackbar.open(`No such event ${eventCode} exists`, 'Undo', {
            duration: 3000
          })
        }
      })

  }

  fetchQuestions(eventId: string) {
    debugger;
    this.afDb.collection<QuestionModel>('questions',
      (ref) => ref.where('eventId', '==', eventId)
    )
      .valueChanges()
      .subscribe((questions) => {
        debugger;
        this._liveQuestion = questions;
        this.liveEventQuestionsChanged.next([...this._liveQuestion]);
      })
  }

  fetchAllEvents() {
    this.afDb.collection<SlidoEvent>('events')
    .valueChanges()
    .subscribe((data)=>{
      this._liveAllEvents=data;
      this.allEventsChanged.next([...this._liveAllEvents]);
    })
  }
}
