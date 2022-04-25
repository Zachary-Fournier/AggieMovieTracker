const url = "http://localhost:5000"

const tmdbAPIKEY = "b5ce997bdba83155626b1dc7815961ae"

export async function getUserInfo(userName) {
    let userInfo = fetch(`${url}/get-user-info/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return userInfo;
}

export async function getUserPass(userName) {
    let userInfo = fetch(`${url}/get-user-password/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return userInfo;
}

export async function getUserID(userName) {
    let data = fetch(`${url}/get-user-ID/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return data;
}

export async function getUserWatchlist(userName) {
    let data = fetch(`${url}/get-user-watchlist/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return data;
}

export async function getUserReviews(userName) {
    let data = fetch(`${url}/get-user-reviews/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return data;
}

export async function getUserPosts(userName) {
    let data = fetch(`${url}/get-user-posts/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return data;
}


export async function getMovieInfo(movieID) {
    let movieInfo = fetch(`${url}/get-movie-info/${movieID}`)
        .then(response => response.json())
        .then(result => {return result});

    return movieInfo;
}

export async function getMoviePoster(movieID) {
    let movieInfo = fetch(`https://api.themoviedb.org/3/find/${movieID}?api_key=${tmdbAPIKEY}&external_source=imdb_id`)
        .then(response => response.json())
        .then(result => {return result});
    return movieInfo;
}

export async function getMoviesFromSearch(query) {
    let movies = fetch(`${url}/get-movies/${query}`)
        .then(response => response.json())
        .then(result => {return result});

    return movies;
}


// ADD FUNCTIONS FOR POST ROUTES
// Is it the same as the get routes? We just execute it and it will update??
// Try function below?
export async function addUser(userName, userPassword) {
    let res = fetch(`${url}/add-user/${userName}/${userPassword}`)
        .then(response => response.json())
        .then(result => result)

    // Res will return "Success" or "Failure" inside of response key
    return res;
}

export async function addRating(userID, movieID, num_stars) {
    let res = fetch(`${url}/add-rating/${userID}/${movieID}/${num_stars}`)
        .then(response => response.json())
        .then(result => result)

    // Res will return "Success" or "Failure" inside of response key
    return res;
}

export async function addToWatchlist(userID, movieID) {
    let res = fetch(`${url}/add-to-watchlist/${userID}/${movieID}}`)
        .then(response => response.json())
        .then(result => result)

    // Res will return "Success" or "Failure" inside of response key
    return res;
}

export async function updateFavoriteMovie(userID, movieID) {
    let res = fetch(`${url}/update-favorite-movie/${userID}/${movieID}}`)
        .then(response => response.json())
        .then(result => result)

    // Res will return "Success" or "Failure" inside of response key
    return res;
}

export async function addPost(userID, postDecription) {
    let res = fetch(`${url}/add-post/${userID}/${postDecription}}`)
        .then(response => response.json())
        .then(result => result)

    // Res will return "Success" or "Failure" inside of response key
    return res;
}





