import React, { useEffect, useState } from 'react'
import { Alert, Button } from 'reactstrap';
import { deleteFromWatchlist, getUserWatchlist } from '../Utilities';

export default function WatchlistPage() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    const [removeSuccessful, setRemoveSuccessful] = useState(0);
    const [watchlist, setWatchlist] = useState([]);

    async function remove(movieID) {
        let result = await deleteFromWatchlist(userInfo.userID, movieID);
        if(result.response === "Success") {
            setRemoveSuccessful(1);
            window.location.reload();
            userInfo.numMovies++;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
            setRemoveSuccessful(0);
        }

    }
    async function getWatchlist() {
        let results = await getUserWatchlist(userInfo.user_name);
        setWatchlist(results.movie_watchlist);
        console.log('watchlist: ', watchlist);
    }

    useEffect(() => {
        getWatchlist();
    }, []);

    return (
        <div>
            <h1>Watchlist</h1>
            {watchlist.length === 0 &&
                <h1>Your watchlist is empty!</h1>
            }
            {watchlist.map((movie, i) => {
                return(
                    <div key={i}>
                        <a href={`https://www.imdb.com/title/${movie[0]}/`} target='_blank' rel="noreferrer">
                        {movie[2]} ({movie[5]})
                        </a>
                        <Button onClick={() => {
                            remove(movie[0])
                        }}>Remove</Button>
                    </div>
                )
            })}
            {removeSuccessful === 1 &&
                <Alert>The movie is now gone from your watchlist!</Alert>
            }
            {removeSuccessful === -1 &&
                <Alert color='danger'>An error occurred, please try again!</Alert>
            }
        </div>
    )
}
