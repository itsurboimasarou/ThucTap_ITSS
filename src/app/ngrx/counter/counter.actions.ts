import {createAction} from '@ngrx/store';

export const increase = createAction('[Counter] Increase');

export const decrease = createAction('[Counter] Decrease');

export const setCount = createAction('[Counter] Set Count', (count: number) => ({ count }));
