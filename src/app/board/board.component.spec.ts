import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import {BoardColComponent} from './board-col.component';
import { BoardComponent } from './board.component';
import {BoardElementsPipe} from '../board-elements.pipe';
import {BoardRowComponent} from './board-row.component';
import {Store} from '@ngrx/store';

xdescribe('BoardComponent', () => {
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
