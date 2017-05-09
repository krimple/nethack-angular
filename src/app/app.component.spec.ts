import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {BoardComponent} from './board/board.component';

import {Store} from '@ngrx/store';
import {BoardRowComponent} from './board/board-row.component';
import {BoardColComponent} from './board/board-col.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        {
          provide: Store,
          useFactory: () => {
            return {
              dispatch: () => { console.log('dispatched!'); }
            };
          }
        }
      ],
      declarations: [
        AppComponent,
        BoardComponent,
        BoardRowComponent,
        BoardColComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});