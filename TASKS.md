# Task Board

Eight tasks, one per bug. Work them **in order** — they get harder, and the
later ones assume you're comfortable running the tests.

Ticket IDs (`CALC-1`…`CALC-8`) are there so you can reference them in commit
messages and in your pull request description.

**Before you start:** run `npm test` and note the failure count. It should be
**11 failing, 9 passing**. That number should only ever go down.

| ID | Title | Difficulty | File |
| --- | --- | --- | --- |
| [CALC-1](#calc-1) | Subtraction returns the wrong sign | Easy | `src/calculator.js` |
| [CALC-2](#calc-2) | A number can contain more than one decimal point | Easy | `src/calculator.js` |
| [CALC-3](#calc-3) | Backspacing the last digit empties the display | Easy | `src/calculator.js` |
| [CALC-4](#calc-4) | Percent calculates the inverse | Easy | `src/calculator.js` |
| [CALC-5](#calc-5) | Dividing by zero shows `Infinity` to the user | Medium | `src/calculator.js` |
| [CALC-6](#calc-6) | Floating point noise reaches the display | Medium | `src/calculator.js` |
| [CALC-7](#calc-7) | `C` doesn't clear the pending operator | Hard | `src/calculator.js` |
| [CALC-8](#calc-8) | *(title withheld — see the ticket)* | Hard | ??? |

---

<a id="calc-1"></a>
## CALC-1 — Subtraction returns the wrong sign

**Difficulty:** Easy · **File:** `src/calculator.js`

Every subtraction comes out negated.

**Steps to reproduce**
1. Open the app.
2. Press `9` `−` `4` `=`.
3. Display shows `-5`. It should show `5`.

**Failing tests**
- `subtract returns left minus right`
- `operate dispatches to the right operation`
- `a new operand replaces the display after an operator`

**Hint:** compare the parameter names in `subtract` with the order they're used
in. Ask yourself why the `multiply` test passes but this one doesn't.

**Done when**
- [ ] All three tests above pass
- [ ] `9 − 4 =` shows `5` in the browser
- [ ] Committed as `CALC-1: …` with a message explaining the cause

---

<a id="calc-2"></a>
## CALC-2 — A number can contain more than one decimal point

**Difficulty:** Easy · **File:** `src/calculator.js`

The decimal key appends a `.` unconditionally, so you can build a string that
isn't a number. Any maths on it produces `NaN`.

**Steps to reproduce**
1. Press `1` `.` `5` `.` `9` → display shows `1.5.9`.
2. Now press `+` `1` `=` → display shows `NaN`.

**Failing test**
- `a number can only contain one decimal point`

**Hint:** the fix belongs in `inputDecimal`, before the character is added — not
in a later clean-up step. Rejecting bad input at the door beats repairing it
downstream.

**Done when**
- [ ] Test passes
- [ ] Pressing `.` repeatedly adds at most one point
- [ ] `0.5` can still be typed normally, and `.` still works right after an operator

---

<a id="calc-3"></a>
## CALC-3 — Backspacing the last digit empties the display

**Difficulty:** Easy · **File:** `src/calculator.js`

Deleting the final character leaves the display completely blank instead of
falling back to zero.

**Steps to reproduce**
1. Press `7`.
2. Press the <kbd>Backspace</kbd> key. *(Backspace is keyboard-only — there's no
   button for it on the keypad.)*
3. The display is empty. It should show `0`.

**Failing test**
- `backspace on a single digit falls back to zero`

**Hint:** what does `'7'.slice(0, -1)` return, and is that value truthy?

**Done when**
- [ ] Test passes
- [ ] `backspace removes the last character` still passes (don't break the normal case)

---

<a id="calc-4"></a>
## CALC-4 — Percent calculates the inverse

**Difficulty:** Easy · **File:** `src/calculator.js`

**Steps to reproduce**
1. Press `5` `0` `%`.
2. Display shows `5000`. It should show `0.5`.

**Failing tests**
- `percent converts a number to its percentage value`
- `applyPercent divides the display by one hundred`

**Hint:** "per cent" means "per hundred". One character changes.

**Done when**
- [ ] Both tests pass
- [ ] `50 %` → `0.5` and `200 %` → `2`

---

<a id="calc-5"></a>
## CALC-5 — Dividing by zero shows `Infinity` to the user

**Difficulty:** Medium · **File:** `src/calculator.js`

JavaScript happily returns `Infinity` for `5 / 0`. A calculator shouldn't put
that in front of a person.

**Steps to reproduce**
1. Press `5` `÷` `0` `=`.
2. Display shows `Infinity`. It should show `Error`.

**Failing test**
- `dividing by zero reports an error instead of Infinity`

**Hint:** guard the divisor *before* dividing. The test tells you the exact
string to return — read it rather than inventing your own wording.

**⚠ This task has a second half.** Fixing `divide` alone won't turn the test
green. Run the test after your first attempt and read the new error carefully:
`operate` passes every result through another function on its way out, and that
function now receives something it wasn't written to handle. Fixing that is part
of this ticket. (CALC-6 is about the same function — you may want to read it
first.)

**Done when**
- [ ] Test passes
- [ ] `5 ÷ 0 =` shows `Error` in the browser
- [ ] Normal division is untouched — `9 ÷ 2` is still `4.5`

---

<a id="calc-6"></a>
## CALC-6 — Floating point noise reaches the display

**Difficulty:** Medium · **File:** `src/calculator.js`

`round()` is currently a function that returns its input unchanged, so binary
floating point artefacts go straight to the screen.

**Steps to reproduce**
1. Press `0` `.` `1` `+` `0` `.` `2` `=` → display shows `0.30000000000000004`.
2. Press `1` `.` `1` `×` `3` `=` → display shows `3.3000000000000003`.

**Failing tests**
- `operate cleans up floating point artefacts`
- `operate keeps genuine precision`

**Hint:** `Math.round(value * 1e10) / 1e10` is the shape of the fix. The two
tests pull in opposite directions on purpose — one wants the noise gone, the
other asserts `1 ÷ 3` is still `0.3333333333`. Round too hard and you fail the
second; too softly and you fail the first. `1e10` is the number that satisfies
both, and you should be able to say why.

**Bonus question to answer in your PR:** why is `0.1 + 0.2 !== 0.3` in the first
place? This isn't a JavaScript quirk — it affects almost every language.

**Done when**
- [ ] Both tests pass
- [ ] `round` also survives being handed a non-number (see CALC-5)

---

<a id="calc-7"></a>
## CALC-7 — `C` doesn't clear the pending operator

**Difficulty:** Hard · **File:** `src/calculator.js`

This one is sneaky: `C` *looks* like it works. The display resets to `0` and
everything seems fine. The damage only shows up two keystrokes later.

**Steps to reproduce**
1. Press `8`, then `×`. The display shows `8`.
2. Press `C`. The display resets to `0` — looks correct.
3. Press `5`, then `=`.
4. Display shows `0`. It should show `5` — nothing should have been pending.

**Failing test**
- `clear resets the calculator completely`

**Hint:** read the comment block above the `Calculator` class. It documents four
pieces of state. Count how many `clear()` actually resets.

**Reflection question for your PR:** without a test, how would you ever have
noticed this? What made it invisible in step 2?

**Done when**
- [ ] Test passes
- [ ] The reproduction above ends with `5`
- [ ] `clear()` leaves the object in exactly the state a fresh `new Calculator()` would

---

<a id="calc-8"></a>
## CALC-8 — The one the tests can't catch

**Difficulty:** Hard · **File:** you have to work that out

After CALC-1 through CALC-7, `npm test` reports **20 passing, 0 failing**.

The calculator is still wrong.

**Steps to reproduce:** none given. Open the app, use it like a calculator, and
find it. Press every key and check that each one does what its label says.

**Failing test:** none — and that's the entire point of this ticket.

**Hint:** the test file only ever imports `calculator.js`. It never opens a page,
never clicks a button, never reads the HTML. So there is a whole category of bug
it structurally cannot see. Where does a button's *meaning* actually come from?

**Done when**
- [ ] You've found it without being told
- [ ] It's fixed, and you can explain in your PR why no unit test caught it
- [ ] You can name one other bug that could hide in this same blind spot

---

## Definition of done — the whole board

- [ ] `npm test` → **20 passing, 0 failing**
- [ ] No changes to `test/calculator.test.js` (making a test pass by weakening
      it fails the exercise)
- [ ] Eight commits, one per ticket, each prefixed `CALC-n:` and each explaining
      *what was wrong*, not just *what you changed*
- [ ] You have opened the app in a browser and pressed every key
- [ ] Pull request opened, listing all eight tickets with a line on each
- [ ] Answered the two questions from CALC-6 and CALC-7 in the PR description
