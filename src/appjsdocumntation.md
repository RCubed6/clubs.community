# Search Bar
First, data is fetched from the local server on localhost:3001
- React.useeffect is a hook which runs a function once parameter values are changed. This is used to fetch the data. 
- The dataset is only fetched once. Instead of fetching new data from the backend every time you search, when you run the search function, the 

    `const [filteredClubs, setFilteredClubs] = React.useState([])` 

    is run, which simply updates the displayed clubs.
## clubs hook
The clubs hook `const [clubs, setClubs] = React.useState([])` is used to store all the clubs.
- Updated when the clubs are fetched from the backend.
## filtered clubs hook
The filteredClubs hook `const [filteredClubs, setFilteredClubs] = React.useState([])` is used to store the club results once you search for a club.
- Updated when you run `handleSearch()`.

## handleSearch
Updates filteredClubs based on searchbar input parameters.
- The input parameters are represented as `event.target.value`
- `if search` checks if inputed search params exist so that the search results are only updated when there exists search params.

## handleClick
handleClick is similar to handleSearch, except that it updates the search results when you click a search category button.

## createModal
Activates the popup mode when you click on a club.





