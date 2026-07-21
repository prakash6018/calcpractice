import test from 'node:test';
import assert from 'node:assert/strict';

import {
  add,
  subtract,
  multiply,
  divide,
  percent,
  operate,
  Calculator,
} from '../src/calculator.js';

// ---------------------------------------------------------------------------
// Arithmetic
// ---------------------------------------------------------------------------

test('add returns the sum', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(add(-4, 4), 0);
});

test('subtract returns left minus right', () => {
  assert.equal(subtract(10, 4), 6);
  assert.equal(subtract(3, 8), -5);
});

test('multiply returns the product', () => {
  assert.equal(multiply(6, 7), 42);
  assert.equal(multiply(5, 0), 0);
});

test('divide returns the quotient', () => {
  assert.equal(divide(12, 4), 3);
  assert.equal(divide(9, 2), 4.5);
});

test('dividing by zero reports an error instead of Infinity', () => {
  assert.equal(divide(5, 0), 'Error');
});

test('percent converts a number to its percentage value', () => {
  assert.equal(percent(50), 0.5);
  assert.equal(percent(200), 2);
});

test('operate dispatches to the right operation', () => {
  assert.equal(operate(8, '+', 2), 10);
  assert.equal(operate(8, '-', 2), 6);
  assert.equal(operate(8, '*', 2), 16);
  assert.equal(operate(8, '/', 2), 4);
});

test('operate cleans up floating point artefacts', () => {
  assert.equal(operate(0.1, '+', 0.2), 0.3);
  assert.equal(operate(1.1, '*', 3), 3.3);
});

test('operate keeps genuine precision', () => {
  assert.equal(operate(1, '/', 3), 0.3333333333);
});

// ---------------------------------------------------------------------------
// Typing into the calculator
// ---------------------------------------------------------------------------

test('digits build up the display', () => {
  const calc = new Calculator();
  calc.inputDigit(1);
  calc.inputDigit(2);
  assert.equal(calc.inputDigit(3), '123');
});

test('a number can only contain one decimal point', () => {
  const calc = new Calculator();
  calc.inputDigit(1);
  calc.inputDecimal();
  calc.inputDigit(5);
  calc.inputDecimal();
  calc.inputDigit(9);
  assert.equal(calc.display, '1.59');
});

test('backspace on a single digit falls back to zero', () => {
  const calc = new Calculator();
  calc.inputDigit(7);
  assert.equal(calc.backspace(), '0');
});

test('backspace removes the last character', () => {
  const calc = new Calculator();
  calc.inputDigit(4);
  calc.inputDigit(2);
  assert.equal(calc.backspace(), '4');
});

test('toggleSign flips the sign of the display', () => {
  const calc = new Calculator();
  calc.inputDigit(9);
  assert.equal(calc.toggleSign(), '-9');
  assert.equal(calc.toggleSign(), '9');
});

test('applyPercent divides the display by one hundred', () => {
  const calc = new Calculator();
  calc.inputDigit(5);
  calc.inputDigit(0);
  assert.equal(calc.applyPercent(), '0.5');
});

// ---------------------------------------------------------------------------
// Running a calculation
// ---------------------------------------------------------------------------

test('a simple calculation works end to end', () => {
  const calc = new Calculator();
  calc.inputDigit(6);
  calc.chooseOperator('+');
  calc.inputDigit(4);
  assert.equal(calc.equals(), '10');
});

test('chained operators evaluate as you go', () => {
  const calc = new Calculator();
  calc.inputDigit(2);
  calc.chooseOperator('+');
  calc.inputDigit(3);
  calc.chooseOperator('*');   // shows 5
  assert.equal(calc.display, '5');
  calc.inputDigit(4);
  assert.equal(calc.equals(), '20');
});

test('clear resets the calculator completely', () => {
  const calc = new Calculator();
  calc.inputDigit(8);
  calc.chooseOperator('*');
  calc.clear();

  // Nothing is pending any more, so 5 = should just be 5.
  calc.inputDigit(5);
  assert.equal(calc.equals(), '5');
});

test('a new operand replaces the display after an operator', () => {
  const calc = new Calculator();
  calc.inputDigit(9);
  calc.chooseOperator('-');
  calc.inputDigit(4);
  assert.equal(calc.display, '4');
  assert.equal(calc.equals(), '5');
});

test('the result of one calculation can feed into the next', () => {
  const calc = new Calculator();
  calc.inputDigit(1);
  calc.inputDigit(0);
  calc.chooseOperator('/');
  calc.inputDigit(4);
  assert.equal(calc.equals(), '2.5');

  calc.chooseOperator('+');
  calc.inputDigit(1);
  assert.equal(calc.equals(), '3.5');
});
