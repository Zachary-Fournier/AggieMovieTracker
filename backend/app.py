from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello World"
# CONNECTING TO POSTGRES, CAN USE THIS TO PUT DATA IN VARIABLES AND ADD TO ROUTES
# conn = psycopg2.connect("dbname=310-Project user=postgres password=postgres")
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