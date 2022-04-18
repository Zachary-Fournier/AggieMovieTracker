from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

# Create a bunch of helper functions that take SQL query as input and returns output
# Ex: Returning a movie from the database
# Create a bunch of helper functions that allow to add users and passwords and so on
# Can add movies to movie list for that certain user and more

@app.route("/")
def hello_world():
    return "Hello World"

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

# Add google cloud credit using another teammates 465 coupon

# Check Flask documentation on how to do post, delete, get requests
# https://flask.palletsprojects.com/en/2.0.x/quickstart/

# Create routes for all of the following functionalities:
# GET REQUESTS
# - Username/password as input -> Check if username exists and if it does, check if password matches (return True or False) (GET)
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
conn = psycopg2.connect(
    host="34.68.45.235",
    database="postgres",
    user="postgres",
    password="postgres")
cur = conn.cursor()
cur.execute("SELECT COUNT(tconst) FROM moviesreal")
lst = cur.fetchall()
for i in range(len(lst)):
    print(lst[i])


if __name__ == '__main__':
    app.run()