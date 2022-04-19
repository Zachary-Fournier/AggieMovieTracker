import React, { useEffect, useState } from 'react'
import { Button, Input, Spinner } from 'reactstrap';
import { getUserInfo } from '../Utilities';

export default function ProfilePage() {
  const [searchInput, setSearchInput] = useState("John Doe");
  const [userName, setUserName] = useState("Name")
  const [userAge, setUserAge] = useState("Age");
  const [userFavMovie, setFavMovie] = useState("Favorite Movie");
  const [userNumMovies, setNumMovies] = useState("Number of Movies Watched");
  const [isLoading, setIsLoading] = useState(false);

  async function onSearchButtonClick() {
    console.log("RAN");
    setIsLoading(true);
    let results = await getUserInfo(searchInput);
    setIsLoading(false);


    
    setUserName(results.user_name);
    setUserAge(results.age);
    setFavMovie(results.favMovie);
    setNumMovies(results.numMovies);


    console.log(userName);
  }

    return (
      <div>
  
        <Button onClick={onSearchButtonClick}>Dummy Button for user John Doe!</Button>

        <br/>
        {isLoading &&
        <Spinner></Spinner>}
        <br/>

        <p>{userName}</p>
        <p>{userAge}</p>
        <p>{userFavMovie}</p>
        <p>{userNumMovies}</p>
        
      </div>
    )
  

  
}
