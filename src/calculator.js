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

// Turns a number into its percentage value.
// Example: 50 becomes 0.5.
export function percent(value) {
  return value / 100;
}

// Removes floating-point artifacts such as:
// 0.1 + 0.2 = 0.30000000000000004
export function round(value) {
  if (typeof value !== "number") {
    return value;
  }

  return Math.round(value * 1e10) / 1e10;
}

export function operate(a, operator, b) {
  switch (operator) {
    case "+":
      return round(add(a, b));

    case "-":
      return round(subtract(a, b));

    case "*":
      return round(multiply(a, b));

    case "/":
      return round(divide(a, b));

    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

/**
 * Holds the state of the calculator as the user types.
 *
 * display   - what the calculator screen currently shows
 * stored    - the first number entered
 * operator  - the selected operator
 * overwrite - whether the next digit replaces the display
 */
export class Calculator {
  constructor() {
    this.clear();
  }

  clear() {
    this.display = "0";
    this.stored = null;
    this.operator = null;
    this.overwrite = false;

    return this.display;
  }

  inputDigit(digit) {
    if (this.display === "Error" || this.overwrite) {
      this.display = String(digit);
      this.overwrite = false;
    } else if (this.display === "0") {
      this.display = String(digit);
    } else {
      this.display += String(digit);
    }

    return this.display;
  }

  inputDecimal() {
    if (this.display === "Error" || this.overwrite) {
      this.display = "0.";
      this.overwrite = false;
      return this.display;
    }

    if (!this.display.includes(".")) {
      this.display += ".";
    }

    return this.display;
  }

  backspace() {
    if (this.display === "Error" || this.overwrite) {
      return this.display;
    }

    this.display = this.display.slice(0, -1);

    if (
      this.display === "" ||
      this.display === "-"
    ) {
      this.display = "0";
    }

    return this.display;
  }

  chooseOperator(operator) {
    const current = Number(this.display);

    if (this.display === "Error") {
      return this.display;
    }

    // Perform the previous operation when an operator
    // has already been selected.
    if (
      this.stored !== null &&
      this.operator !== null &&
      !this.overwrite
    ) {
      const result = operate(
        this.stored,
        this.operator,
        current
      );

      this.stored = result;
      this.display = String(result);
    } else {
      this.stored = current;
    }

    this.operator = operator;
    this.overwrite = true;

    return this.display;
  }

  equals() {
    if (
      this.operator === null ||
      this.stored === null
    ) {
      return this.display;
    }

    const result = operate(
      this.stored,
      this.operator,
      Number(this.display)
    );

    this.display = String(result);
    this.stored = null;
    this.operator = null;
    this.overwrite = true;

    return this.display;
  }

  toggleSign() {
    if (this.display === "Error") {
      return this.display;
    }

    const value = Number(this.display);

    if (value !== 0) {
      this.display = String(value * -1);
    }

    return this.display;
  }

  applyPercent() {
    if (this.display === "Error") {
      return this.display;
    }

    this.display = String(
      round(percent(Number(this.display)))
    );

    return this.display;
  }
}