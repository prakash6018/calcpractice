# The Bug List

Eight bugs. Roughly ordered easiest to hardest.

Each one gives you the symptom and a nudge — not the fix. Work out the *why*
before you change a line; a fix you can't explain is a guess.

---

### 1. Subtraction gives the wrong sign

`10 - 4` returns `-6`.

> Look very carefully at the parameter names in `subtract`.

---

### 2. Numbers can have more than one decimal point

Typing `1 . 5 . 9` gives you `1.5.9`, which isn't a number at all — it turns
into `NaN` the moment you do maths with it.

> `inputDecimal` never checks what's already on screen.

---

### 3. Backspacing the last digit empties the display

Type `7`, press backspace, and the display goes blank instead of showing `0`.

> What does `'7'.slice(0, -1)` return? What *should* be shown when there's
> nothing left?

---

### 4. Percent goes the wrong way

`50 %` should give `0.5`. It gives `5000`.

> "Per cent" means "per hundred". The code multiplies.

---

### 5. Dividing by zero shows `Infinity`

`5 ÷ 0` prints `Infinity` at the user. A calculator should say something
sensible instead.

> The tests tell you the exact string they expect. Guard the divisor before
> you divide. Then check: does `round` cope with being handed that string?

---

### 6. Floating point noise leaks onto the screen

`0.1 + 0.2` displays `0.30000000000000004`.

> `round` is currently a function that does nothing. Make it round to about ten
> decimal places — enough to kill the noise, not so aggressive that `1 ÷ 3`
> loses its precision. `Math.round(value * 1e10) / 1e10` is the shape of it.
> Careful: not every value passed in is a number (see bug 5).

---

### 7. `C` doesn't really clear

Press `8`, then `×`, then `C`. The display resets to `0`, but the pending `×`
is still lurking. Type `5`, press `=`, and you get `0` instead of `5`.

> `clear()` resets three things. The class actually has four pieces of state.
> The comment above the class lists them all.

---

### 8. The bug the tests can't see

`npm test` is green and the calculator is still wrong. Open the app, press
every button, and check that each one does what its label says.

> The tests only ever talk to `calculator.js`. They never touch the buttons.
> So where does a button's meaning actually come from?

---

## When you're done

- [ ] `npm test` — 20 passing, 0 failing
- [ ] Opened the app and clicked every single key
- [ ] One commit per bug, each message explaining *what* was wrong
- [ ] Pushed your branch and opened a pull request
