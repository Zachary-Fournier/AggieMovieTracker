//Written by Zachary Fournier
//this code is utalized for assisting the backend

const url = "http://localhost:5000"

const tmdbAPIKEY = "b5ce997bdba83155626b1dc7815961ae"

// Get user info using the get route from backend (app.py)
export async function getUserInfo(userName) {
    let userInfo = fetch(`${url}/get-user-info/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return userInfo;
}

// Get user password using the get route from backend (app.py)
export async function getUserPass(userName) {
    let userInfo = fetch(`${url}/get-user-password/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return userInfo;
}

// Get userID using the get route from backend (app.py)
export async function getUserID(userName) {
    let data = fetch(`${url}/get-user-ID/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return data;
}

// Get user watchlist using the get route from backend (app.py)
export async function getUserWatchlist(userName) {
    let data = fetch(`${url}/get-user-watchlist/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return data;
}

// Get user reviews of movies using the get route from backend (app.py)
export async function getUserReviews(userName) {
    let data = fetch(`${url}/get-user-reviews/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return data;
}

// Get users posts using the get route from backend (app.py)
export async function getUserPosts(userName) {
    let data = fetch(`${url}/get-user-posts/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return data;
}

// Get users' post IDs which will allow for deleting the posts later on (they will be in same order as getUserPosts)
export async function getUserPostsID(userName) {
    let data = fetch(`${url}/get-user-posts-id/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return data;
}

// Delete post based on post ID
export async function deletePost(postID) {
    // If there is an error, it might mean that postID has to be a string

    let data = fetch(`${url}/delete-post/${postID}`)
        .then(response => response.json())
        .then(result => result)

    return data;
}

// Get all posts using the get route from backend (app.py)
export async function getAllPosts() {
    let data = fetch(`${url}/get-all-posts/`)
        .then(response => response.json())
        .then(result => result)

    return data;
}

// Get movie info using the get route from backend (app.py)
export async function getMovieInfo(movieID) {
    let movieInfo = fetch(`${url}/get-movie-info/${movieID}`)
        .then(response => response.json())
        .then(result => {return result});

    return movieInfo;
}

// Get movie info using the get route from backend (app.py) but with name
export async function getMovieInfoWithName(movieName) {
    let movieInfo = fetch(`${url}/get-movie-info-with-name/${movieName}`)
        .then(response => response.json())
        .then(result => {return result});

    return movieInfo;
}

// Get movie poster using the get route from backend (app.py)
export async function getMoviePoster(movieID) {
    let movieInfo = fetch(`https://api.themoviedb.org/3/find/${movieID}?api_key=${tmdbAPIKEY}&external_source=imdb_id`)
        .then(response => response.json())
        .then(result => {return result});
    return movieInfo;
}

// Get movie through a search bar using the get route from backend (app.py)
export async function getMoviesFromSearch(query) {
    let movies = fetch(`${url}/get-movies/${query}`)
        .then(response => response.json())
        .then(result => {return result});

    return movies;
}


// ADD FUNCTIONS FOR POST ROUTES
// Is it the same as the get routes? We just execute it and it will update??
// Try function below?
// Adding a user through post route from backend (app.js)
export async function addUser(userName, userPassword) {
    let res = fetch(`${url}/add-user/${userName}/${userPassword}`)
        .then(response => response.json())
        .then(result => result)

    // Res will return "Success" or "Failure" inside of response key
    return res;
}

// Adding a rating for movie through post route from backend (app.js)
export async function addRating(userID, movieID, num_stars) {
    let res = fetch(`${url}/add-rating/${userID}/${movieID}/${num_stars}`)
        .then(response => response.json())
        .then(result => result)

    // Res will return "Success" or "Failure" inside of response key
    return res;
}

// Adding a movie for user wathchlist through post route from backend (app.js)
export async function addToWatchlist(userID, movieID) {
    let res = fetch(`${url}/add-to-watchlist/${userID}/${movieID}`)
        .then(response => response.json())
        .then(result => result)

    // Res will return "Success" or "Failure" inside of response key
    return res;
}

// Delete a movie for user wathchlist through delete route from backend (app.js)
export async function deleteFromWatchlist(userID, movieID) {
    // If there is an error, it might mean that userId or movieId has to be a string
    let res = fetch(`${url}/delete-movie-from-watchlist/${userID}/${movieID}`)
        .then(response => response.json())
        .then(result => result)

    // Res will return "Success" or "Failure" inside of response key
    return res;
}

// Delete a post done by certain user and post id


// Updating a user TO ADMIN through update route from backend (app.js)
export async function makeAdmin(userID) {
    let res = fetch(`${url}/make-admin/${userID}`)
        .then(response => response.json())
        .then(result => result)

    // Res will return "Success" or "Failure" inside of response key
    return res;
}

// Updating a user's favorite movie through update route from backend (app.js)
export async function updateFavoriteMovie(userID, movieID) {
    let res = fetch(`${url}/update-favorite-movie/${userID}/${movieID}`)
        .then(response => response.json())
        .then(result => result)

    // Res will return "Success" or "Failure" inside of response key
    return res;
}

// Adding a user post through post route from backend (app.js)
export async function addPost(userID, postDecription) {
    let res = fetch(`${url}/add-post/${userID}/${postDecription}`)
        .then(response => response.json())
        .then(result => result)

    // Res will return "Success" or "Failure" inside of response key
    return res;
}





