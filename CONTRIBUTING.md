# How to hand in your fixes

## 1. Get the code

```bash
git clone <the-repo-url>
cd calcpractice
npm test        # confirm you see the failures
```

## 2. Make a branch

Never work directly on `main`.

```bash
git checkout -b fix/calculator-bugs
```

## 3. Fix one bug at a time

For each bug: read the failing test, find the cause, fix it, re-run `npm test`,
then commit *just that fix*.

```bash
git add src/calculator.js
git commit -m "Fix subtraction returning the wrong sign

subtract() computed b - a, so the operands were swapped."
```

A good commit message says what was wrong and why the fix is right. "fixed bug"
tells a reviewer nothing.

## 4. Push and open a pull request

```bash
git push -u origin fix/calculator-bugs
```

Then open a pull request on GitHub. In the description, list the eight bugs and
one line on each.

## 5. Expect review comments

I'll leave comments on the pull request. Push follow-up commits to the same
branch — they show up on the PR automatically. That back-and-forth *is* the
exercise; a first pass that needs no changes is rare.

## Ground rules

- Don't edit `test/calculator.test.js`. Making a test pass by weakening it is
  the one way to fail this exercise.
- Don't reformat or rewrite code you aren't fixing. Keep the diff small — it
  makes review possible.
- If you get stuck for more than 30 minutes on one bug, message me. Being stuck
  is normal; staying stuck silently isn't.
