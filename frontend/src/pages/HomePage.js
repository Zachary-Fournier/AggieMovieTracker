import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from 'reactstrap';
import { getMoviesFromSearch } from '../Utilities';

export default function HomePage() {

  const [userName, setUserName] = useState();
  const [searchInput, setSearchInput] = useState();
  const [movieResults, setMovieResults] = useState([]);
  
  async function onSearchButtonClick() {
    movieResults = await getMoviesFromSearch(searchInput);
  }

  return (
    <div>
      <Input type="text"
      onChange={(e) => setSearchInput(e.target.value)}
      value={searchInput}
      ></Input>
      <Button onClick={onSearchButtonClick}>Search for movies!</Button>
    </div>
  )
}
