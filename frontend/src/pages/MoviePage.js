import React, { useEffect, useState} from 'react'
import { Button } from 'reactstrap';
import { getMovieInfo, getMoviePoster } from '../Utilities';

export default function MoviePage() {

    const [movieInfo, setMovieInfo] = useState([]);
    const [moviePosterURL, setMoviePosterURL] = useState();

    async function getMovie() {
        let results = await getMovieInfo(window.location.href.slice(30));
        let posterPath = await getMoviePoster(window.location.href.slice(30));
        setMovieInfo(results.movie[0]);
        setMoviePosterURL(`http://image.tmdb.org/t/p/original${posterPath.movie_results[0].poster_path}`)
    }

    async function rateMovie() {
        console.log('rateMovie');
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
                    <p>movie title: {movieInfo[2]}</p> <br/>
                    <p>genre name: {movieInfo[8]}</p> <br/>
                    <p>movie duration: {movieInfo[7]} mins</p> <br/>
                    <p>release date: {movieInfo[5]}</p> <br/>
                    <p>avg rating</p> <br/>
                    <img src={moviePosterURL} style={{width: "25%", height: "50%"}}>
                    </img>
                    <Button onClick={rateMovie()}>Leave a Rating!</Button>
                </div>
            )
            }
        </div>
    )
}
