import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import {BoardElementsPipe} from '../board-elements.pipe';
import {Store} from '@ngrx/store';
import {BoardColComponent} from './board-col.component';
import {BoardRowComponent} from './board-row.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent, BoardElementsPipe, BoardColComponent, BoardRowComponent],
      providers: [
        {
          provide: Store,
          useFactory: () => {
            return {
              dispatch: (request: any) => {
                console.log('dispatched!~!!');
                console.dir(request);
              }
            };
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
