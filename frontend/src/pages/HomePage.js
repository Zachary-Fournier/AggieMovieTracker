import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Input, Label, Spinner } from 'reactstrap';
import { getMoviesFromSearch } from '../Utilities';

export default function HomePage() {

  const [userName, setUserName] = useState();
  const [searchInput, setSearchInput] = useState();
  const [movieResults, setMovieResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  /**
   * this function will query the database to find all movies that match a search query
   * Written by Mark Treviño
   */
  async function onSearchButtonClick() {
    setIsLoading(true);
    let results = await getMoviesFromSearch(searchInput);
    setIsLoading(false);
    setMovieResults(results.movies);
  }

  return (
    <div>
      <Label for='movieTitle'>
        Movie Title:
      </Label>
      <Input type="text"
        id='movieTitle'
        style={{width: '50%', margin: 'auto'}}
        placeholder="Movie title (Spider-Man, Thor, The Batman, etc.)"
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
