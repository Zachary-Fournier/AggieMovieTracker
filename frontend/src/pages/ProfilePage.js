import React, { useEffect, useState } from 'react'
import { Spinner } from 'reactstrap';
import { getMoviePoster } from '../Utilities';

export default function ProfilePage() {
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [userFavMovie, setFavMovie] = useState("");
  const [userNumMovies, setNumMovies] = useState("");
  const [moviePosterURL, setMoviePosterURL] = useState();
  const [isLoading] = useState(false);

  /**
   * function gets user info from local storage and sets it to respective variables
   * function also gets info to display poster of user's favorite movie
   * written by Jash Choksi
   */
  async function getProfile() {
    const item = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(item);
    setUserName(userInfo.user_name);
    if (userInfo.isAdmin) {
      setUserType("Admin");
    } else {
      setUserType("Standard");
    }
    setNumMovies(userInfo.numMovies);
    if (userInfo.favMovie === null) {
      setFavMovie("None");
    } else {
      setFavMovie(userInfo.favMovie[2]);
      let result = await getMoviePoster(userInfo.favMovie[0]);
      setMoviePosterURL(`http://image.tmdb.org/t/p/original${result.movie_results[0].poster_path}`)
    }
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
        <p><b>User Type:</b> {userType}</p>
        <p><b>Number of Movies Watched:</b> {userNumMovies}</p>
        <p><b>Favorite Movie:</b> {userFavMovie}</p>
        <img src={moviePosterURL} style={{width: "25%", height: "50%"}}></img>
        
      </div>
    )  
}
