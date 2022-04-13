import React, { useEffect, useState} from 'react'

export default function MoviePage() {

    const [movieInfo, setMovieInfo] = useState();

    
    useEffect(() => {

    }, [])

    return (
        <div>
            <p>movie title</p> <br/>
            <p>genre name</p> <br/>
            <p>movie duration</p> <br/>
            <p>release date</p> <br/>
            <p>avg rating</p> <br/>
        </div>
    )
}
