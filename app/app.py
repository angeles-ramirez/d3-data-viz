################################################
# Overview

# /
# Home page.
# This page is a the html which uses javascript and css to run the leaflet and scrollama applications.


# /api/historical.json
# Converts MongoDB query results to a json for use in the visualization.js and scrollytelling.js applications.


# /api/7day.json
# Converts MongoDB query results to a json for use in the visualization.js and scrollytelling.js applications.


################################################
from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
# import scrape_mars

app = Flask(__name__)

# # Use flask_pymongo to set up mongo connection
# app.config["MONGO_URI"] = "mongodb://localhost:27017/project2_testDB"
# mongo = PyMongo(app)

@app.route("/")
def index():

    # Render the template. See javascript files for functionality
    return render_template("index.html")

@app.route("/api/historical/<politician>")
def historical():
    # @TODO: create a function that connects to the mongo database and gathers tweets related to the politician in question
    all_tweets = {
        "tweet1": {"handle" : "BernieSanders",
                "text": "This is Bernie Sanders Tweeting"},
        "tweet2": {"handle" : "Donald J. Trump",
                "text": "This is Trump Tweeting"},
    }

    return jsonify(all_tweets)

@app.route("/api/7day/<politician>")
def sevenday():
    # @TODO: create a function that connects to the mongo database and gathers tweets related to the politician in question
    recent_tweets = {
        "t101": {"handle": "BernieSanders", "time" : 10-12-2019, "text": "We need to raise the minimum wage."},
        "t102": {"handle": "BernieSanders", "time" : 10-13-2019, "text": "College should be free."},
        "t103": {"handle": "BernieSanders", "time" : 10-14-2019, "text": "Americans should be from America."},
        "t104": {"handle": "BernieSanders", "time" : 10-15-2019, "text": "China is the worst."}
    }

    return jsonify(recent_tweets)


if __name__ == '__main__':
    
    app.run(debug=True)
