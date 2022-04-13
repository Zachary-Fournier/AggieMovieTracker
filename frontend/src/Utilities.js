let url = "https://localhost:5000"
export async function getMovies() {
    let movies = fetch(`${url}/get-movies`)
        .then()
}

export async function getUserInfo(userName) {
    let userInfo = fetch(`${url}/get-user-info/${userName}`)
        .then(response => response.json())
        .then(result => result)

    return userInfo;
}

export async function getMovieInfo(movieName) {
    let movieInfo = fetch(`${url}/get-user-info/${movieName}`)
        .then(response => response.json())
        .then(result => result);

    return movieInfo;
}

export async function getMoviesFromSearch(query) {
    let movies = fetch(`${url}/get-movies/${query}`)
        .then(response => response.json())
        .then(result => result);

    return movies;
}