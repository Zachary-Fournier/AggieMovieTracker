from flask import Flask, request, jsonify
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
# conn = psycopg2.connect(
#         host="localhost",
#         database="310-Project",
#         user="postgres",
#         password="postgres"
#     )
conn = psycopg2.connect("dbname=310-Project user=postgres password=postgres")
cur = conn.cursor()
# print('testing')
# conn = psycopg2.connect(
#     host="34.68.45.235",
#     database="postgres",
#     user="postgres",
#     password="postgres")
# print('howdy')
# cur = conn.cursor()
# cur.execute("SELECT COUNT(tconst) FROM moviesreal")
# lst = cur.fetchall()
# for i in range(len(lst)):
#     print(lst[i])

@app.route("/get-movie-info/<string:movieID>")
@cross_origin()
def get_movie_info(movieID):
    cur.execute("SELECT * FROM movies WHERE tconst = (%s);", (movieID, ))
    movieInfo = cur.fetchall()
    print(movieInfo)
    return {"movie": movieInfo}

@app.route("/get-movies/<string:movie>")
@cross_origin()
def get_movies(movie):
    cur.execute("SELECT * FROM movies WHERE UPPER(primary_title) = UPPER(%s) AND title_type = 'movie';", (movie,))
    movies = cur.fetchall()
    if len(movies) == 0:
        return "404 Not Found"
    response = { "movies": movies}
    
    return response



if __name__ == '__main__':
    app.run()