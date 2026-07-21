import { Calculator } from './calculator.js';

const calc = new Calculator();
const display = document.getElementById('display');

function render(value) {
  display.textContent = value;
}

document.querySelector('.keys').addEventListener('click', (event) => {
  const key = event.target.closest('button');
  if (!key) return;

  const { digit, operator, action } = key.dataset;

  if (digit !== undefined) return render(calc.inputDigit(digit));
  if (operator !== undefined) return render(calc.chooseOperator(operator));

  switch (action) {
    case 'clear':
      return render(calc.clear());
    case 'sign':
      return render(calc.toggleSign());
    case 'percent':
      return render(calc.applyPercent());
    case 'decimal':
      return render(calc.inputDecimal());
    case 'equals':
      return render(calc.equals());
  }
});

document.addEventListener('keydown', (event) => {
  const { key } = event;

  if (key >= '0' && key <= '9') return render(calc.inputDigit(key));
  if (['+', '-', '*', '/'].includes(key)) return render(calc.chooseOperator(key));
  if (key === '.') return render(calc.inputDecimal());
  if (key === 'Backspace') return render(calc.backspace());
  if (key === 'Escape') return render(calc.clear());
  if (key === 'Enter') return render(calc.equals());
});
