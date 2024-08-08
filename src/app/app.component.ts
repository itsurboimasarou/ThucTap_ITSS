import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterState } from "./ngrx/counter/counter.state";
import { AsyncPipe, DatePipe } from "@angular/common";
import { Store } from "@ngrx/store";
import * as CountActions from './ngrx/counter/counter.actions';
import * as TimeActions from './ngrx/timer/time.actions';
import { Observable } from "rxjs";
import { FormsModule } from "@angular/forms";
import { TimeState } from './ngrx/timer/time.state';
import { getTime } from './ngrx/timer/time.actions';
import {RocketService} from "./ngrx/services/rocket.service";
import {MakeCoffeeService} from "./ngrx/services/make-coffee.service";
import {CalculatorComponent} from "./components/calculator/calculator.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, FormsModule, DatePipe, CalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'store3';
  count$!: Observable<number>;
  time$!: Observable<Date>;

  constructor(private store: Store<{
    counter: CounterState,
    timer: TimeState
  }>, private rocketService:RocketService, private makeCoffeeService: MakeCoffeeService) {
    this.count$ = this.store.select("counter", "count");
    this.time$ = this.store.select("timer", "time");
    setInterval(() => {
      this.getTime();
    }, 1000);
  }

  public increase() {
    this.store.dispatch(CountActions.increase());
  }

  public decrease() {
    this.store.dispatch(CountActions.decrease());
  }

  public setCount(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const inputElement = event.target as HTMLInputElement;
      const parsedCount = parseInt(inputElement.value, 10);
      if (!isNaN(parsedCount)) {
        this.store.dispatch(CountActions.setCount(parsedCount));
      }
    }
  }

  getTime() {
    this.store.dispatch(TimeActions.getTime());
  }

  public async launch() {
    await this.rocketService.planA();
  }

  public async cupA() {
    await this.makeCoffeeService.cupA();
  }
}
