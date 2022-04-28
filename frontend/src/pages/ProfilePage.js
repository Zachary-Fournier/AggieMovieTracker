import React, { useEffect, useState } from 'react'
import { Spinner } from 'reactstrap';

export default function ProfilePage() {
  const [userName, setUserName] = useState("");
  const [userFavMovie, setFavMovie] = useState("");
  const [userNumMovies, setNumMovies] = useState("");
  const [isLoading] = useState(false);

  /**
   * function gets user info from local storage and sets it to respective variables
   * written by Jash Choksi
   */
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
  
  /**
   * updates and displays user info on profile page after render
   */
  useEffect(() => {
    getProfile();
  }, [])

    return (
      <div>
        <br/>
        {isLoading &&
        <Spinner></Spinner>}
        <br/>

        <p><b>Username:</b> {userName}</p>
        <p><b>Favorite Movie:</b> {userFavMovie}</p>
        <p><b>Number of Movies Watched:</b> {userNumMovies}</p>
        
      </div>
    )  
}
