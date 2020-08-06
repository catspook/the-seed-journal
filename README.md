# The-Seed-Journal
<br />
This is a repository to hold the web application to give information regarding plants using the treffle.io API.
<br />

The app is hosted by Heroku at [the-seed-journal.herokuapp.com](the-seed-journal.herokuapp.com).

## Building

### Development Dependencies

1. Node 12 or greater
2. npm

### Steps

1. clone
2. ` npm i `
2.5 ` npm install boostrap ` - if you are building the style sheets
3. ` npm start ` - this will compile the webpage and open it at http://localhost:3000

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run scss-watch`

Note: For active stylesheet development

Generates the CSS files and watches for changes in the `src/styles/scss` directory
Compiles to the `src/styles/css` directory

### `npm run scss-compile`

Generates the code for every scss file in the `src/styles/scss' directory and stores them in the `src/styles/css` directory.

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
