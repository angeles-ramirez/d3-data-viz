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
from pymongo import MongoClient
import pymongo
from flask import Flask, jsonify, render_template


app = Flask(__name__)

# Connect to Mongo DB Atlas

#deployment_matt = "mongodb+srv://thrum-rw:Skipshot1@thrumcluster-f2hkj.mongodb.net/test?retryWrites=true&w=majority"
deployment_victor = "mongodb+srv://vgalst:akopova123@tweetering-giclm.mongodb.net/test?retryWrites=true&w=majority"
#testing = "mongodb://localhost:27017/myDatabase"

client = pymongo.MongoClient(deployment_victor)
db = client.twitter
serverStatusResult = db.command("serverStatus")
if serverStatusResult:
    print("""
Connection to MongoDB was successful
    """)
    print("The following collections are available: ", db.list_collection_names())


@app.route("/")
def index():

    # Render the template. See javascript files for functionality
    return render_template("index.html")


@app.route("/api/historical/<user_name>")
def twitter_user(user_name: str):
    """Takes a politician's name and returns tweets related to that politician"""
    # @TODO: create a function that connects to the mongo database and gathers tweets related to the politician in question
    politician_translate_user = {
        "BernieSanders": "@BernieSanders",
        "realDonaldTrump": "@realDonaldTrump",
        "JoeBiden": "@JoeBiden",
        "ewarren": "@ewarren",
        "Chas10Buttigieg": "@Chas10Buttigieg",
        "KamalaHarris": "@KamalaHarris",
        "AndrewYang": "@AndrewYang",
        "tedcruz": "@tedcruz",
        "SecretaryCarson": "@SecretaryCarson",
        "Mike_Pence": "@Mike_Pence",
        "MikeBloomberg": "@MikeBloomberg",
        "TulsiGabbard": "@TulsiGabbard"
    }

    filter1 = politician_translate_user[f'{user_name}']
    print(filter1)
    collection = db['userdata']

    # .limit(100) # do not return document Id, as this is not serializable
    sample_tweets = collection.find({"keyword": filter1}, {'_id': False})

    return jsonify([sample_tweet for sample_tweet in sample_tweets])


@app.route("/api/hashtag/<user_name>")
def sevenday(user_name: str):
    # @TODO: create a function that connects to the mongo database and gathers tweets related to the politician in question
    politician_translate_hashtag = {
        "BernieSanders": "#feelthebern",
        "realDonaldTrump": "#keepamericagreat",
        "JoeBiden": "#TeamJoe",
        "ewarren": "#teamwarren",
        "Chas10Buttigieg": "#PeteButtigieg",
        "KamalaHarris": "#KamalaHarris",
        "AndrewYang": "#YangGang",
        "tedcruz": "#TedCruz",
        "SecretaryCarson": "#BenCarson",
        "Mike_Pence": "#MikePence",
        "MikeBloomberg": "#MikeBloomberg",
        "TulsiGabbard": "#TulsiGabbard"
    }

    filter2 = politician_translate_hashtag[f'{user_name}']
    print(filter2)
    collection = db['hashtagdata']

    # .limit(100) # do not return document Id, as this is not serializable
    sample_tweets = collection.find({"keyword": filter2}, {'_id': False})

    return jsonify([sample_tweet for sample_tweet in sample_tweets])

if __name__ == '__main__':

    app.run(debug=True)