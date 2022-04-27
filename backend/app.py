# MAHIR KHAN


# How do we get the info from the frontend? Through a form? Through the URL?
# Once we find out how we get the info from frontend and how the frontend wants the
# info back, we can start creating our routes
# We also need to create the new tables in PGADMIN 
#   - User, Watchlist, Rating, Post
#   - Do not need genre (already given with movies table)
#   - Movies table already made

# User Table
# Attributes: user_id (PK), user_age, user_first_name, user_last_name, user_favorite_movie_id, user_password, user_creation_date, is_admin
# Watchlist Table
# Attributes: watchlist_id(PK), movie_id, user_id -> Do not need watchlist_id, we can use as a bridge entity
# Rating Table
# Attributes: rating_id(PK), movie_id, user_id -> Do not need rating_id, we can use as a bridge entity
# Post Table
# Attributes: post_id(PK), user_id, post_description

# Check Flask documentation on how to do post, delete, get requests
# https://flask.palletsprojects.com/en/2.0.x/quickstart/

# Create routes for all of the following functionalities:
# GET REQUESTS
# - Username as input -> Check if username exists and if it does, return the password, otherwise return nothing(GET)
# - Username as input -> Get info back (GET)
#       - Name, age, favorite movie, # of movies reviewed
# - Movie name as input -> Get info back for movie from movie table(GET)
#       - Genre, release date, average rating
# - Username as input -> Get info back for movies and the ratings given (GET)
#       - We can get the movie name/ratings from the rating table
# - Username as input -> Get info back for every movie reviewed and also movies in the watchlist (GET)
#       - Watchlist table and also reviews table
# - Username as input: Get info back on every post (GET)
#       - Post table
# POST REQUESTS
# - Username/password as input -> Create a new user with default columns (except password) (POST)
# - Username, movie, and rating as input -> Add movie review into database (POST) 
#       - Need to add to Rating table
#       - Need to update the average rating table (Maybe)
#       - Need to update # of movies reviewed watched in user
# - Username, movie -> Add to movie watchlist for user (POST)
# - Username, movie -> Add to favorite movie column for User (POST)
# - Username, post -> Add to post table (POST)
# UPDATE REQUESTS
# - Username, post_id -> Update the post
# DELETE REQUESTS
# - Username, post_id -> Delete the post


# Example on how to connect and run SQL Query


from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import psycopg2
import json

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

@app.route("/")
@cross_origin()
def hello_world():
    return "Hello World"


# CONNECTING TO POSTGRES, CAN USE THIS TO PUT DATA IN VARIABLES AND ADD TO ROUTES
conn = psycopg2.connect(
    host="34.68.45.235",
    database="postgres",
    user="postgres",
    password="postgres")
cur = conn.cursor()


# HELPER FUNCTIONS. WE CAN CONVERT ID TO USERNAME OR MOVIE NAME TO ID
def getUserIdFromUserName(cur, userName):
    cur.execute("select user_id from users where user_name = (%s);", (userName,))
    userId = cur.fetchall()
    return str(userId[0][0])

def getUserNameFromUserId(cur, userID):
    cur.execute("select user_name from users where user_id = (%s);", (str(userID),))
    userName = cur.fetchall()
    return str(userName[0][0])

def getMovieNameFromMovieId(cur, movieID):
    cur.execute("SELECT primarytitle FROM moviesreal WHERE tconst = (%s);", (movieID, ))
    movies = cur.fetchall()
    return movies[0][0]

def getMovieIdFromMovieName(cur, movieName):
    cur.execute("SELECT tconst FROM moviesreal WHERE UPPER(moviesreal.primarytitle) = UPPER(%s);", (movieName, ))
    movies = cur.fetchall()
    return movies[0][0]



# GET USER INFORMATION WITH USERNAME, LATER WE WILL ADD A FUNCTION THAT GETS THE USER ID BASED ON THE USERNAME AND PASSWORD (LOGIN)
@app.route("/get-user-info/<string:userName>")
@cross_origin()
def get_user_info(userName):
    cur.execute("SELECT * FROM users WHERE UPPER(users.user_name) = UPPER(%s);", (userName,))
    userInfo = cur.fetchall()[0]
    print(userInfo)

    
    return {"user_name": userInfo[0],
     "favMovie": userInfo[1],
     "numMovies": userInfo[2],
     "userID": userInfo[3],
     "password": userInfo[4],
     "isAdmin": userInfo[5]
    }

# GET USER PASSWORD WITH USERNAME, USE TO CHECK IF MATCHES IN LOGIN
@app.route("/get-user-password/<string:userName>")
@cross_origin()
def get_user_pass(userName):
    cur.execute("SELECT password FROM users WHERE UPPER(users.user_name) = UPPER(%s);", (userName,))
    userPass = cur.fetchall()
    print(userPass)

    
    return {"password": userPass}

# GET USER ID WITH THE USERNAME
@app.route("/get-user-ID/<string:userName>")
@cross_origin()
def get_user_id(userName):
    # First find the user id with userName
    cur.execute("select user_id from users where user_name = (%s);", (userName,))
    userId = cur.fetchall()

    
    return {"user_id": userId[0][0]}

# GET ALL OF THE MOVIES AND REVIEWS FROM THE ASSOCIATED USER_ID -> Inside of utilities.js need to call username -> id and then also movieid -> moviename to get real movie data
@app.route("/get-user-reviews/<string:userName>")
@cross_origin()
def get_user_reviews(userName):
    userId = getUserIdFromUserName(cur, userName)
    userID = str(userID)
    # First find the user id with userName
    cur.execute("select movie_id, num_stars from rating where user_id = (%s);", (userId,))
    data = cur.fetchall()
    convertedData = []
    # Go through the data and convert the movie id's into movies
    for entry in data:
        convertedData.append([getMovieNameFromMovieId(cur, entry[0]), entry[1]])

    data = convertedData
    print(data)


    # Remember that the data is inside of a tuple, so we need to query like this: tuple_data[0]
    return {"movie_ratings": data}


# GET ALL OF THE MOVIES IN WATCHLIST FROM ASSOCIATED USER_ID -> LIST OF MOVIE IDS THAT NEED TO BE CONVERTED INTO MOVIES WITH OTHER ROUTE (movie id -> movie)

@app.route("/get-user-watchlist/<string:userName>")
@cross_origin()
def get_user_watchlist(userName):
    # First find the user id with userName
    userID = str(userID)
    userId = getUserIdFromUserName(cur, userName)
    cur.execute("select movie_id from watchlist where user_id = (%s);", (userId,))
    data = cur.fetchall()
    # Go through the data and switch to movie names instead of id's
    convertedData = []
    for entry in data:
        convertedData.append(getMovieNameFromMovieId(cur, entry))
    data = convertedData
    print(data)
    # Remember that the data is inside of a tuple, so we need to query like this: tuple_data[0]
    return {"movie_watchlist": data}

# GET ALL OF THE POSTS FOR A USER WITH USER_ID
@app.route("/get-user-posts/<string:userId>")
@cross_origin()
def get_user_posts(userId):
    userID = str(userID)
    # First find the user id with userName
    cur.execute("select post_description from posts where user_id = (%s);", (userId,))
    data = cur.fetchall()
    print(data)

    # Remember that the data is inside of a tuple, so we need to query like this: tuple_data[0]
    return {"posts": data}

cur.execute("select * from posts;")
data = cur.fetchall()
print(data)

# GET ALL OF THE POSTS FOR ALL USERS
@app.route("/get-all-posts/")
@cross_origin()
def get_posts():
    # First find the user id with userName
    cur.execute("select * from posts;")
    data = cur.fetchall()
    print(data)

    # Remember that the data is inside of a tuple, so we need to query like this: tuple_data[0]
    return {"posts": data}


# GET MOVIE INFORMATION WITH MOVIE ID
@app.route("/get-movie-info/<string:movieID>")
@cross_origin()
def get_movie_info(movieID):
    cur.execute("SELECT * FROM moviesreal WHERE tconst = (%s);", (movieID, ))
    movieInfo = cur.fetchall()
    print(movieInfo)
    return {"movie": movieInfo}

# GET MOVIES FROM THE MOVIE NAME (STRING)
@app.route("/get-movies/<string:movie>")
@cross_origin()
def get_movies(movie):
    cur.execute("SELECT * FROM moviesreal WHERE UPPER(moviesreal.primarytitle) = UPPER(%s) AND moviesreal.titletype = 'movie';", (movie,))
    # print("SELECT * FROM moviesreal WHERE UPPER(moviesreal.primarytitle) = UPPER(%s) AND moviesreal.titletype = 'movie';", (movie,))
    movies = cur.fetchall()
    if len(movies) == 0:
        return "404 Not Found"
    response = { "movies": movies}
    return response

# POST REQUESTS
# Create a new user with password
# GET MOVIE INFORMATION WITH MOVIE ID
@app.route("/add-user/<string:userName>/<string:userPassword>")
@cross_origin()
def add_user(userName, userPassword):

    try:
        # First check if the userName already exists
        sqlStmt = "select * from users where user_name = '{}';".format(userName)
        cur.execute(sqlStmt)
        data = cur.fetchall()
        if len(data) == 0:    
            sqlStmt = "INSERT INTO users (user_name, num_movies_watched, password, is_admin) VALUES ('{}', 0, '{}', false);".format(userName, userPassword)
            cur.execute(sqlStmt)
            conn.commit()
            data = "Success"
        else:
            data = "Failure"
    except:
        data = "Failure"
    return {"response": data}

# user Id, movie Id, and rating as input -> Add movie review into database (POST)
# Need to do two things: Add to rating table and add to users table (adding to num_movies_watched)
# If needed, we can later change the userID to userName and movieID to movie name
@app.route("/add-rating/<string:userID>/<string:movieID>/<int:num_stars>")
@cross_origin()
def add_rating(userID, movieID, numStars):
    try:
        userID = str(userID)
        sqlStmt = "INSERT INTO rating (movie_id, user_id, num_stars) VALUES ('{}', '{}', {});".format(movieID, userID, numStars)
        cur.execute(sqlStmt)
        conn.commit()
        # Increase by one in num movies for specific user id
        # First find the num_movies in users table and then use an update for the sql command
        cur.execute("select num_movies_watched from users where user_id = {};".format(int(userID)))
        numMovies = cur.fetchone()[0]
        sqlStmt = "UPDATE users SET num_movies_watched = '{}' WHERE user_id = {};".format(str(numMovies), userID)
        cur.execute(sqlStmt)
        conn.commit()
        data = "Success"
    except:
        data = "Failure"
    return {"response": data}


# MAKE THE USER ADMIN TO GIVE ADMIN PRIVILEGES
@app.route("/make-admin/<string:userID>")
@cross_origin()
def make_admin(userID):
    try:
        userID = str(userID)
        sqlStmt = "UPDATE users SET is_admin = true WHERE user_id = {}".format(userID)
        cur.execute(sqlStmt)
        conn.commit()
        data = "Success"
    except:
        data = "Failure"
    return {"response": data}

# UserID, movie -> Add to movie watchlist
@app.route("/add-to-watchlist/<string:userID>/<string:movieID>")
@cross_origin()
def add_to_watchlist(userID, movieID):
    try:
        userID = str(userID)
        sqlStmt = "INSERT INTO watchlist (user_id, movie_id) VALUES ('{}', '{}');".format(userID, movieID)
        cur.execute(sqlStmt)
        conn.commit()
        
        data = "Success"
    except:
        data = "Failure"
    return {"response": data}


# Update favorite movie, userID as input, movieID as input
@app.route("/update-favorite-movie/<string:userID>/<string:movieID>")
@cross_origin()
def update_favorite_movie(userID, movieID):
    try:
        # First get the movie name from the movieID
        userID = str(userID)
        movieName = getMovieNameFromMovieId(cur, movieID)
        sqlStmt = "UPDATE users SET favorite_movie = '{}' WHERE user_id = {};".format(movieName, userID)
        cur.execute(sqlStmt)
        conn.commit()
        data = "Success"
    except:
        data = "Failure"

    return {"response": data}


# Create a post for userID
@app.route("/add-post/<string:userID>/<string:postDescription>")
@cross_origin()
def add_post(userID, postDescription):
    try:
    
        # First check if user is admin
        userID = str(userID)
        sqlStmt = "select is_admin from users where user_id = {};".format(userID)
        cur.execute(sqlStmt)
        is_admin = cur.fetchone()[0]
        if is_admin == False:
            print("Not admin")
            data = "Failure"
            return {"response": data}
        
        sqlStmt = "INSERT INTO posts (user_id, post_description) VALUES ('{}', '{}');".format(userID, postDescription)
        cur.execute(sqlStmt)
        conn.commit()
        
        data = "Success"
    except:
        data = "Failure"
    return {"response": data}


if __name__ == '__main__':
    app.run()