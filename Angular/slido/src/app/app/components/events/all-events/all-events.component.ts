    
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { EventService } from 'src/app/core/services/event.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SlidoEvent } from 'src/app/components/shared/models/event.model';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [ 'code', 'createdOn', 'expiresOn' ];
  dataSource = new MatTableDataSource<SlidoEvent>();
  allEventsSubscription: Subscription;

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.eventService.fetchAllEvents();
    this.allEventsSubscription = this.eventService.allEventsChanged.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.allEventsSubscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
