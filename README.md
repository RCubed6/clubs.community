# clubs.community
A platform to make finding clubs easier.

<p align="center">
<img width="500" alt="github-ex-page" src="https://user-images.githubusercontent.com/75544738/197845107-95b27667-9bc1-4c66-8903-11c73fe6defc.png">
</p>

## Current Features:

1. View clubs, and display a popup for them when clicked
2. Search for clubs, and filter them by category
3. Links to other resources for making the club experience better!

<hr />

# Run Locally:
**1. Clone the project:**

```
git clone https://github.com/RCubed6/clubs.community.git
```

**2. In the `clubs.commmunity` folder, install dependencies:**

```
npm i
```

**3. Run the front-end and back-end:**

**Important:** You must start the backend before running the frontend!

In the project directory, open the `clubs.community/api` folder, then run `npm start`:

```
cd api
npm start
```

This will run the front-end in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

 
Next navigate to the global directory `clubs.community`, and run:

```
npm start
```

This runs the frontend. Open http://localhost:3000 to view it in your browser. 

The frontend and backend will update automatically when changes are saved. Lint warnings may be shown in the console. These are not fatal errors.

<hr />

# Tests

### `npm test`

To run the test suite.

# Future Features:

1. Integration to join clubs, create clubs, and/or request funding within the app.
2. Authentication system, so only Nueva students can access club info.
3. Ways for club leaders to dynamically interact with members in the app, such as sending emails or a forum