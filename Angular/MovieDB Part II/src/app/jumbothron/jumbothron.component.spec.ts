import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JumbothronComponent } from './jumbothron.component';

describe('JumbothronComponent', () => {
  let component: JumbothronComponent;
  let fixture: ComponentFixture<JumbothronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JumbothronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JumbothronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
