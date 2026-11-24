# QuickCart

A very small Angular shopping cart used for the SWEN 261 unit testing assignment.
The application contains seeded defects. Your task is described in the assignment brief.

## Requirements

- Node.js 24 LTS (24.15 or later) is recommended; 22.22.3 or later also works. Check with `node -v`.
- npm (installed with Node.js)

## Commands

Run these from the project folder.

| Purpose | Command |
| --- | --- |
| Install the dependencies (once) | `npm install` |
| Start the application at http://localhost:4200 | `npm start` |
| Run the unit tests and keep watching for changes | `npm test` |
| Run the unit tests once | `npm test -- --no-watch` |
| Run the unit tests once with a coverage report | `npm test -- --no-watch --coverage` |

The coverage report is printed in the terminal and saved in `coverage/quickcart/index.html`.

## Files you will work with

| File | Purpose |
| --- | --- |
| `src/app/cart-item.ts` | `CartItem` class (under test) |
| `src/app/cart.service.ts` | `CartService` class (under test) |
| `src/app/cart-item.spec.ts` | Your unit tests for `CartItem` |
| `src/app/cart.service.spec.ts` | Your unit tests for `CartService` |
| `src/app/app.ts`, `app.html`, `app.css` | The screen. Not part of the assignment. |

The tests run with Vitest, the default test runner of Angular 22. Tests are written
with `describe`, `it` and `expect`.
