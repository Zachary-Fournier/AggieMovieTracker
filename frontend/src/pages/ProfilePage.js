import React, { useEffect, useState } from 'react'
import { Spinner } from 'reactstrap';

export default function ProfilePage() {
  const [userName, setUserName] = useState("");
  const [userFavMovie, setFavMovie] = useState("");
  const [userNumMovies, setNumMovies] = useState("");
  const [isLoading] = useState(false);

  async function getProfile() {
    const item = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(item);
    setUserName(userInfo.user_name);
    if (userInfo.favMovie == null) {
      setFavMovie("None");
    } else {
      setFavMovie(userInfo.favMovie);
    }
    setNumMovies(userInfo.numMovies);
  }
  

  useEffect(() => {
    getProfile();
  }, [])

    return (
      <div>
        <br/>
        {isLoading &&
        <Spinner></Spinner>}
        <br/>

        <p>Username: {userName}</p>
        <p>Favorite Movie: {userFavMovie}</p>
        <p>Number of Movies Watched: {userNumMovies}</p>
        
      </div>
    )  
}
