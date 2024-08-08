import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  public calc(a: number, b: number, op: (n1: number, n2: number) => number): number {
    return op(a, b);
  }

  public add(a: number, b: number): number {
    return a + b;
  }

  public div(a: number, b: number): number {
    return a / b;
  }

}
