from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello World"
# CONNECTING TO POSTGRES, CAN USE THIS TO PUT DATA IN VARIABLES AND ADD TO ROUTES
conn = psycopg2.connect("dbname=310-Project user=postgres password=postgres")
cur = conn.cursor()
cur.execute("SELECT * from movies LIMIT 10;")
print(cur.fetchone())

if __name__ == '__main__':
    app.run()