import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})

export class CalculatorComponent {
  displayValue: string = '';
  firstOperand: number | null = null;
  secondOperand: number | null = null;
  currentOperation: string | null = null;
  currentOperationSign: string | null = null;

  appendNumber(number: string) {
    if (this.displayValue === '0') {
      this.displayValue = number;
    } else {
      this.displayValue += number;
    }
  }

  chooseOperation(operation: string) {
    if (this.displayValue === '') return;
    if (this.firstOperand === null) {
      this.firstOperand = parseFloat(this.displayValue);
    } else if (this.currentOperation) {
      this.secondOperand = parseFloat(this.displayValue);
      this.compute();
    }
    this.currentOperation = operation;
    this.currentOperationSign = operation;
    this.displayValue = '';
  }

  compute() {
    if (this.firstOperand === null || this.currentOperation === null || this.displayValue === '') return;
    this.secondOperand = parseFloat(this.displayValue);
    let result: number;
    switch (this.currentOperation) {
      case '+':
        result = this.firstOperand + this.secondOperand;
        break;
      case '-':
        result = this.firstOperand - this.secondOperand;
        break;
      case '*':
        result = this.firstOperand * this.secondOperand;
        break;
      case '/':
        result = this.firstOperand / this.secondOperand;
        break;
      default:
        return;
    }
    this.displayValue = this.limitDecimalPlaces(result, 10).toString();
    this.firstOperand = result;
    this.currentOperation = null;
    this.currentOperationSign = null;
  }

  clear() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.secondOperand = null;
    this.currentOperation = null;
    this.currentOperationSign = null;
  }

  delete() {
    if (this.displayValue.length === 1) {
      this.displayValue = '0';
    } else {
      this.displayValue = this.displayValue.slice(0, -1);
    }
  }

  limitDecimalPlaces(value: number, places: number): number {
    const factor = Math.pow(10, places);
    return Math.round(value * factor) / factor;
  }
}
