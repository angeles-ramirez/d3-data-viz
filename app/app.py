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

#Connect to Mongo DB Atlas
import pymongo
from pymongo import MongoClient

deployment_matt = "mongodb+srv://thrum-rw:Skipshot1@thrumcluster-f2hkj.mongodb.net/test?retryWrites=true&w=majority"
deployment_victor = "mongodb+srv://vgalst:akopova123@tweetering-giclm.mongodb.net/test?retryWrites=true&w=majority"
testing = "mongodb://localhost:27017/myDatabase"

client = pymongo.MongoClient(deployment_victor)
db = client.twitter
serverStatusResult=db.command("serverStatus")
if serverStatusResult:
    print("""
Connection to MongoDB was successful
    """)
    print("The following collections are available: ", db.list_collection_names())


@app.route("/")
def index():

    # Render the template. See javascript files for functionality
    return render_template("index.html")

@app.route("/api/historical/<politician>")
def historical(politician: str):
    """Takes a politician's name and returns tweets related to that politician"""
    # @TODO: create a function that connects to the mongo database and gathers tweets related to the politician in question
    collection = db['hashtagdata']
    
    sample_tweets = collection.find({}, {'_id': False}).limit(100) # do not return document Id, as this is not serializable

    return jsonify([sample_tweet for sample_tweet in sample_tweets])

@app.route("/api/7day/<politician>")
def sevenday(politician: str):
    # @TODO: create a function that connects to the mongo database and gathers tweets related to the politician in question

    return "This route is under development"


if __name__ == '__main__':
    
    app.run(debug=True)
