import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<any>)  { }

  ngOnInit() {
    this.store.dispatch({ payload: 'boo!', type: 'NOTHING'});
  }
}
