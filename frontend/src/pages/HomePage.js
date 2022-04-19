import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from 'reactstrap';
import { getMoviesFromSearch } from '../Utilities';

export default function HomePage() {

  const [userName, setUserName] = useState();
  const [searchInput, setSearchInput] = useState();
  const [movieResults, setMovieResults] = useState([]);
  
  async function onSearchButtonClick() {
    let results = await getMoviesFromSearch(searchInput);
    console.log(results)
    setMovieResults(results.movies);
  }

  return (
    <div>
      <Input type="text"
      onChange={(e) => setSearchInput(e.target.value)}
      value={searchInput}
      ></Input>
      <Button onClick={onSearchButtonClick}>Search for movies!</Button>
      {movieResults.length !== 0 &&
        movieResults.map((movie, i) => {
          return (
            <div key={i}>
              <h1>{movie[2]} ({movie[5]})</h1>
              <hr></hr>
            </div>
          )
        })
      }
    </div>
  )
}
