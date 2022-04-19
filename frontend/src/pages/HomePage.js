import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Input, Spinner } from 'reactstrap';
import { getMoviesFromSearch } from '../Utilities';

export default function HomePage() {

  const [userName, setUserName] = useState();
  const [searchInput, setSearchInput] = useState();
  const [movieResults, setMovieResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  async function onSearchButtonClick() {
    setIsLoading(true);
    let results = await getMoviesFromSearch(searchInput);
    setIsLoading(false);
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
              <Link to={`/movie/${movie[0]}`}>
                {movie[2]} ({movie[5]})
              </Link>
            </div>
          )
        })
      }
      <br/>
      {isLoading &&
      <Spinner></Spinner>}
    </div>
  )
}
