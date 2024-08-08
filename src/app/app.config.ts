import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideStore} from "@ngrx/store";
import {counterReducer} from "./ngrx/counter/counter.reducer";
import {timerReducer} from "./ngrx/timer/time.reducer";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(
    {
      "counter": counterReducer,
      "timer": timerReducer
    }
  )]
};
