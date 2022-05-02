import React, { useEffect, useState } from 'react'
import { Spinner } from 'reactstrap';
import { getMoviePoster, getMovieInfoWithName, getUserReviews } from '../Utilities';

export default function ProfilePage() {
  
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const [userFavMovie, setFavMovie] = useState("");
  const [userNumMovies, setNumMovies] = useState("");
  const [reviews, setReviews] = useState([]);
  // const [moviePosterURL, setMoviePosterURL] = useState();
  const [isLoading] = useState(false);

  /**
   * function gets user info from local storage and sets it to respective variables
   * written by Jash Choksi
   */
  async function getProfile() {
    const item = localStorage.getItem("userInfo");
    const userInfo = JSON.parse(item);
    setUserName(userInfo.user_name);
    setUserID(userInfo.userID);
    if (userInfo.isAdmin) {
      setUserType("Admin");
    } else {
      setUserType("Standard");
    }
    setNumMovies(userInfo.numMovies);
    if (userInfo.favMovie === null) {
      setFavMovie("None");
    } else {
      if (Array.isArray(userInfo.favMovie)) {
        setFavMovie(userInfo.favMovie[2]);
      } else {
        setFavMovie(userInfo.favMovie);
      }
    }
    let reviewResults = await getUserReviews(userInfo.user_name);
    setReviews(reviewResults.movie_ratings);
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
        <p><b>User ID:</b> {userID}</p>
        <p><b>User Type:</b> {userType}</p>
        <p><b>Number of Movies Watched:</b> {userNumMovies}</p>
        <p><b>Favorite Movie:</b> {userFavMovie}</p>
        {/* <img src={moviePosterURL} style={{width: "25%", height: "50%"}}></img> */}
        <h1>Your Reviews</h1>
        {reviews.length !== 0 &&
          reviews.map((review, i) => {
            return (
              <div key={i}>
                You gave {review[0][2]}({review[0][5]}) a rating of {review[1]} stars
              </div>
            )
          })
        }
      </div>
    )  
}
