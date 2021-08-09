# PromotionProject

[Demo](https://promotion-project-rs.web.app)

## Installation

Use the package manager [npm](https://www.npmjs.com) to install packages.

```bash
npm install
```

Create `.env` file in application root folder and add some keys:

```bash
USER_EMAIL
USER_PASSWORD
FIREBASE_API_KEY
FIREBASE_AUTH_DOMAIN
FIREBASE_PROJECT_ID
FIREBASE_STORAGE_BUCKET
FIREBASE_MESSAGING_SENDER_ID
FIREBASE_APP_ID
```

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `npm run build:prod` command for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io).

## Running end-to-end tests

Run `npm run cy:run` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

- `npm run cy:open` for open with UI.
- `npm run cy:ci` for run in Travis CI/CD.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
