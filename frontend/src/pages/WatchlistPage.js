import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap';
import { deleteFromWatchlist, getUserWatchlist } from '../Utilities';

export default function WatchlistPage() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [watchlist, setWatchlist] = useState([]);

    async function remove(movie) {
        let results = await deleteFromWatchlist(userInfo.userID, movie);

    }
    async function getWatchlist() {
        console.log(userInfo)
        let results = await getUserWatchlist(userInfo.user_name);
        console.log('results: ', results);
        setWatchlist(results.movie_watchlist);
        console.log('watchlist: ', watchlist);
    }

    useEffect(() => {
        getWatchlist();
    }, []);

    return (
        <div>
            {watchlist.length === 0 &&
                <h1>Your watchlist is empty!</h1>
            }
            {watchlist.map((movie, i) => {
                return(
                    <div key={i}>
                        {movie}
                        <Button onClick={remove(movie)}>Remove</Button>
                    </div>
                )
            })}
        </div>
    )
}
