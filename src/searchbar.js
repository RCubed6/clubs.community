import { React, useState, useEffect } from "react";
// import TextField from "@mui/material/TextField";
import { ReactDOM } from "react";

    // Note: the empty deps array [] means
    // this useEffect will run once
    function SearchBar() {
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [items, setItems] = useState([]);

        //     set search query to empty string
        const [q, setQ] = useState("");
        //     set search parameters
        //     we only what to search countries by capital and name
        //     this list can be longer if you want
        //     you can search countries even by their population
        // just add it to this array
        const [searchParam] = useState(["capital", "name"]);

        useEffect(() => {
            fetch("https://restcountries.eu/rest/v2/all")
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setItems(result);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                );
        }, []);

        if (error) {
            return <>{error.message}</>;
        } else if (!isLoaded) {
            return <>loading...</>;
        } else {
            return (
                <div className="wrapper">
                    <div className="search-wrapper">
                        <label htmlFor="search-form">
                            <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="search-input"
                                placeholder="Search for..."
                                value={q}
                                /*
                                // set the value of our useState q
                                //  anytime the user types in the search box
                                */
                                onChange={(e) => setQ(e.target.value)}
                            />
                            <span className="sr-only">Search countries here</span>
                        </label>
                    </div>
                    <ul className="card-grid">
                        {items.map((item) => (
                            <li>
                                <article className="card" key={item.callingCodes}>
                                    <div className="card-image">
                                        <img src={item.flag} alt={item.name} />
                                    </div>
                                    <div className="card-content">
                                        <h2 className="card-name">{item.name}</h2>
                                        <ol className="card-list">
                                            <li>
                                                population:{" "}
                                                <span>{item.population}</span>
                                            </li>
                                            <li>
                                                Region: <span>{item.region}</span>
                                            </li>
                                            <li>
                                                Capital: <span>{item.capital}</span>
                                            </li>
                                        </ol>
                                    </div>
                                </article>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }



// function SearchBar () {
//     return (
//       <div className="Search">
//         <h1>search</h1>
//         <TextField
//           id="outlined-basic"
//           variant="outlined"
//           fullWidth
//           label="Search"
//         />
        
//         <select
//     /*
//     // here we create a basic select input
//     // we set the value to the selected value
//     // and update the setFilterParam() state every time onChange is called
//     */
//       onChange={(e) => {
//       setFilterParam(e.target.value);
//        }}
//        className="custom-select"
//        aria-label="Filter Countries By Region">
//         <option value="All">Filter By Region</option>
//         <option value="Africa">Africa</option>
//         <option value="Americas">America</option>
//         <option value="Asia">Asia</option>
//         <option value="Europe">Europe</option>
//         <option value="Oceania">Oceania</option>
//         </select>
        
//         <span className="focus"></span>
//       </div>
//     );
// }

export default SearchBar;


// function search(items) {
//   return items.filter((item) => {
// /*
// // in here we check if our region is equal to our c state
// // if it's equal to then only return the items that match
// // if not return All the countries
// */
//   if (item.region == filterParam) {
//       return searchParam.some((newItem) => {
//         return (
//           item[newItem]
//               .toString()
//               .toLowerCase()
//               .indexOf(q.toLowerCase()) > -1
//                    );
//                });
//            } else if (filterParam == "All") {
//                return searchParam.some((newItem) => {
//                    return (
//                        item[newItem]
//                            .toString()
//                            .toLowerCase()
//                            .indexOf(q.toLowerCase()) > -1
//                    );
//                });
//            }
//        });
//    }