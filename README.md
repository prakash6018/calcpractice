# Calculator — Debugging Practice

A small calculator app that **works, but not correctly**. There are **8 bugs**
hiding in it. Your job is to find them, fix them, and push your fixes back.

Nothing to install. No frameworks. Just HTML, CSS and JavaScript.

## Running it

**The test suite** (needs Node 18+):

```bash
npm test
```

You should see a pile of failures. That is expected — the tests describe how the
calculator *should* behave, and the code doesn't live up to them yet.

**The app in a browser:**

```bash
npm run dev
```

Then open <http://localhost:8000>. (The app uses JavaScript modules, so opening
`index.html` by double-clicking it won't work — it has to be served.)

## The files

| File | What's in it |
| --- | --- |
| [src/calculator.js](src/calculator.js) | All the maths and the typing logic. Most bugs live here. |
| [src/ui.js](src/ui.js) | Wires the buttons and keyboard to the calculator. |
| [index.html](index.html) | The markup for the keypad. |
| [test/calculator.test.js](test/calculator.test.js) | The tests. **Treat these as the specification.** |
| [BUGS.md](BUGS.md) | The bug list, with hints. |

## The rules

1. **Do not edit the tests.** They are correct. The source code is not.
2. Fix one bug per commit, so your history tells the story.
3. `npm test` must be fully green before you push.
4. Seven bugs are caught by the tests. **One is not** — you only find it by
   opening the app and using it. Don't skip that step.

## How to hand it in

See [CONTRIBUTING.md](CONTRIBUTING.md) for the exact git commands.
