const url = "http://localhost:5000"

const tmdbAPIKEY = "b5ce997bdba83155626b1dc7815961ae"

export async function getUserInfo(userName) {
    let userInfo = fetch(`${url}/get-user-info/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return userInfo;
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

export async function getPosts() {
    let posts = fetch(`${url}/get-posts`)
        .then(response => response.json())
        .then(result => {return result});

    return posts
}