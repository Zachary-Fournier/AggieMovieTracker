import React, { useEffect, useState} from 'react'
import { Alert, Button, Input } from 'reactstrap';
import { getMovieInfo, getMoviePoster, getUserInfo, updateFavoriteMovie } from '../Utilities';

export default function MoviePage() {

    const [movieInfo, setMovieInfo] = useState([]);
    const [moviePosterURL, setMoviePosterURL] = useState();
    const [ratingStars, setRatingStars] = useState(0);
    const [didFavoriteWork, setDidFavoriteWork] = useState(0);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    async function getMovie() {
        let results = await getMovieInfo(window.location.href.slice(30));
        let posterPath = await getMoviePoster(window.location.href.slice(30));
        setMovieInfo(results.movie[0]);
        setMoviePosterURL(`http://image.tmdb.org/t/p/original${posterPath.movie_results[0].poster_path}`)
    }

    async function rateMovie() {
        console.log('rateMovie');
    }

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
                    <p><b>Movie Title:</b> {movieInfo[2]}</p> <br/>
                    <p><b>Genres:</b> {movieInfo[8]}</p> <br/>
                    <p><b>Duration:</b> {movieInfo[7]} mins</p> <br/>
                    <p><b>Release Date:</b> {movieInfo[5]}</p> <br/>
                    <p><b>Average Rating:</b> </p> <br/>
                    <img src={moviePosterURL} style={{width: "25%", height: "50%"}}>
                    </img>
                    <Input
                    type='number'
                    value={ratingStars}
                    onChange={(e) => {setRatingStars(e.target.value)}}
                    >
                    </Input>
                    <Button onClick={rateMovie}>Leave a Rating!</Button>
                    {userInfo.favMovie === null ?
                        <Button onClick={updateFavMovie}>Favorite movie!</Button>
                        :
                        <Button onClick={updateFavMovie}>Make this your new favorite movie!</Button>
                    }
                    {didFavoriteWork === 1 &&
                    <Alert>'{movieInfo[2]}' is now your favorite movie!</Alert>
                    }
                    {didFavoriteWork === -1 &&
                        <Alert color='danger'>An error occurred, please try again!</Alert>
                    }
                    {/* <Button onClick={addToWatchlist()}>Add to watchlist!</Button> */}
                </div>
            )
            }
        </div>
    )
}
