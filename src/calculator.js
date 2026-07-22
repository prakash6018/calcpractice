// Core calculator logic.
// Kept free of DOM code so it can be unit tested directly.

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b === 0) {
    return "Error";
  }

  return a / b;
}

// Turns a number into its percentage value, e.g. 50 -> 0.5
export function percent(value) {
  return value / 100;
}

// Floating point math leaves artefacts like 0.30000000000000004.
// Trim them without losing real precision.
export function round(value) {
  if (typeof value !== "number") {
    return value;
  }

  return Math.round(value * 1e10) / 1e10;
}

export function operate(a, operator, b) {
  switch (operator) {
    case '+':
      return round(add(a, b));
    case '-':
      return round(subtract(a, b));
    case '*':
      return round(multiply(a, b));
    case '/':
      return round(divide(a, b));
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

/**
 * Holds the state of the calculator as the user types.
 *
 * display   - what the screen currently shows
 * stored    - the left-hand operand, once an operator is pressed
 * operator  - the pending operator, or null
 * overwrite - true when the next digit should replace the display
 *             instead of being appended to it
 */
export class Calculator {
  constructor() {
    this.operator = null;
    this.clear();
  }

  clear() {
    this.display = '0';
    this.stored = null;
    this.overwrite = false;
    return this.display;
  }

  inputDigit(digit) {
    if (this.overwrite || this.display === '0') {
      this.display = String(digit);
      this.overwrite = false;
    } else {
      this.display += String(digit);
    }
    return this.display;
  }

  inputDecimal() {
    if (this.overwrite) {
      this.display = '0.';
      this.overwrite = false;
      return this.display;
    }

    if (!this.display.includes('.')) {
      this.display += '.';
    }

    return this.display;
  }

  backspace() {
    if (this.overwrite) {
      this.display = '0';
      this.overwrite = false;
      return this.display;
    }

    this.display = this.display.slice(0, -1);

    if (this.display === '') {
      this.display = '0';
    }

    return this.display;
  }

  chooseOperator(operator) {
    const current = Number(this.display);

    if (this.operator !== null && !this.overwrite) {
      this.stored = operate(this.stored, this.operator, current);
      this.display = String(this.stored);
    } else {
      this.stored = current;
    }

    this.operator = operator;
    this.overwrite = true;
    return this.display;
  }

  equals() {
    if (this.operator === null) {
      return this.display;
    }

    const result = operate(this.stored, this.operator, Number(this.display));
    this.display = String(result);
    this.stored = null;
    this.operator = null;
    this.overwrite = true;
    return this.display;
  }

  toggleSign() {
    this.display = String(Number(this.display) * -1);
    return this.display;
  }

  applyPercent() {
    this.display = String(percent(Number(this.display)));
    return this.display;
  }
}
