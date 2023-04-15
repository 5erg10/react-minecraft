# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\

### `deploy build`

cd /build <!---from root folder to acces to build folder --> \
git add -A \
git commit <!---to save de changes--> \
cd .. <!---to return to root folder-->
git push origin :gh-pages <!---to reset branch-->
git subtree push --prefix build origin gh-pages <!--- to deploy build with the new changes -->
