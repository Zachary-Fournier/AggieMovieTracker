from flask import Flask, request, jsonify
import psycopg2
import json

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello World"
# CONNECTING TO POSTGRES, CAN USE THIS TO PUT DATA IN VARIABLES AND ADD TO ROUTES
conn = psycopg2.connect(
        host="localhost",
        database="310-Project",
        user="postgres",
        password="postgres"
    )
cur = conn.cursor()

@app.route("/get-user-info/<string:userInfo>")
def user_info(user):
    cur.execute("select 1 from users where user_name = (%s);", (user))

@app.route("/get-movie-info/<string:movie>")
def movie_info(movie):
    cur.execute("SELECT * FROM movies WHERE UPPER(primary_title) = UPPER(%s);", (movie,))
    movies = cur.fetchall()
    if len(movies) == 0:
        return "404 Not Found"
    response = {}
    for movie in movies:
        response[movie[0]] = {
            'tconst': movie[0],
            'title_type': movie[1],
            'primary_title': movie[2],
            'original_title': movie[3],
            'isAdult': movie[4],
            'startYear': movie[5],
            'endYear': movie[6],
            'runtime': movie[7],
            'genres': movie[8]
        }
    
    return response


if __name__ == '__main__':
    app.run()