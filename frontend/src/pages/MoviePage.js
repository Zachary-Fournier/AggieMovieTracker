import React, { useEffect, useState} from 'react'
import { Alert, Button, Input } from 'reactstrap';
import { addRating, addToWatchlist, getMovieInfo, getMoviePoster, getUserInfo, updateFavoriteMovie } from '../Utilities';

export default function MoviePage() {

    const [movieInfo, setMovieInfo] = useState([]);
    const [moviePosterURL, setMoviePosterURL] = useState();
    const [ratingStars, setRatingStars] = useState(0);
    const [didFavoriteWork, setDidFavoriteWork] = useState(0);
    const [didRatingWork, setDidRatingWork] = useState(0);
    const [didAddWatchlistWork, setDidWatchlistWork] = useState(0);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    /**
     * this function will add the movie to the user's watchlist
     * Written by Mark Treviño
     */
    async function addWatchlist() {
        let results = await addToWatchlist(userInfo.userID, window.location.href.slice(30));
        if(results.response == "Success") {
            setDidWatchlistWork(1);
            userInfo.numMovies++;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
            setDidWatchlistWork(-1);
        }
    }
    
    /**
     * this will get all of the movie's information including the poster for it
     * Written by Mark Treviño
     */
    async function getMovie() {
        let results = await getMovieInfo(window.location.href.slice(30));
        let posterPath = await getMoviePoster(window.location.href.slice(30));
        setMovieInfo(results.movie[0]);
        setMoviePosterURL(`http://image.tmdb.org/t/p/original${posterPath.movie_results[0].poster_path}`)
    }
    /**
     * This function will create a new entry on the ratings table with a star rating from 0-5
     * Written by Mark Treviño
     */
    async function rateMovie() {
        let results = await addRating(userInfo.userID, window.location.href.slice(30), ratingStars);
        if(results.response == "Success") {
            setDidRatingWork(1);
        } else {
            setDidRatingWork(-1);
        }
    }
    /**
     * This funcstion will update the user's favorite movie
     * Written by Mark Treivño
     */
    async function updateFavMovie() {
        let result = await updateFavoriteMovie(userInfo.userID, movieInfo[0]);
        if(result.response === "Success") {
            userInfo.favMovie = movieInfo;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            setDidFavoriteWork(1);
        } else {
            setDidFavoriteWork(0);
        }
    }
    

    useEffect(() => {
        getMovie();
    }, [])

    return (
        <div>
            {movieInfo.length !== 0 && (
                <div>
                    <a href={`https://www.imdb.com/title/${movieInfo[0]}/`} target='_blank' rel="noreferrer">
                    {movieInfo[2]}
                    </a>
                    <p><b>Genres:</b> {movieInfo[8]}</p> <br/>
                    <p><b>Duration:</b> {movieInfo[7]} mins</p> <br/>
                    <p><b>Release Date:</b> {movieInfo[5]}</p> <br/>
                    <p><b>Average Rating:</b> </p> <br/>
                    <Input
                    style={{width: '25%', margin: 'auto'}}
                        type='select'
                        value={ratingStars}
                        onChange={(e) => {setRatingStars(e.target.value)}}
                    >
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                    {didRatingWork === 1 &&
                        <Alert>Your rating for '{movieInfo[2]}' was updated!</Alert>
                    }
                    {didRatingWork === -1 &&
                        <Alert color='danger'>Your rating for '{movieInfo[2]}' did not update! Try again later!</Alert>
                    }
                    <Button onClick={rateMovie}>Leave a Rating!</Button>
                    {userInfo.favMovie === null ?
                        <Button onClick={updateFavMovie}>Favorite movie!</Button>
                        :
                        <Button onClick={updateFavMovie}>Make this your new favorite movie!</Button>
                    }
                    <Button onClick={addWatchlist}>Add to your watchlist!</Button>
                    {didFavoriteWork === 1 &&
                    <Alert>'{movieInfo[2]}' is now your favorite movie!</Alert>
                    }
                    {didFavoriteWork === -1 &&
                        <Alert color='danger'>An error occurred, please try again!</Alert>
                    }
                    {didAddWatchlistWork === 1 &&
                    <Alert>'{movieInfo[2]}' is now added to your watchlist!</Alert>
                    }
                    {didAddWatchlistWork === -1 &&
                        <Alert color='danger'>An error occurred, please try again!</Alert>
                    }
                    <br/>
                    <img src={moviePosterURL} style={{width: "25%", height: "50%"}}></img>
                </div>
            )
        }
        </div>
    )
}
