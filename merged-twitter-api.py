# Import the modules
import os
import time
import datetime as DT
import tweepy
import json
import pandas as pd
import numpy as np
from opencage.geocoder import OpenCageGeocode
import functools


def conjunction(*conditions):
    return functools.reduce(np.logical_and, conditions)


def DT_from_utc_to_local(utc_datetime):
    now_timestamp = time.time()
    offset = DT.datetime.fromtimestamp(
        now_timestamp) - DT.datetime.utcfromtimestamp(now_timestamp)
    return utc_datetime + offset


# Load credentials from json file:
os.chdir(r"C:\Users\angy4\BootCamp-HW\d3-data-viz")  # Folder Location
with open("twitter_credentials.json", "r") as file:
    creds = json.load(file)

# Set up Twitter Authentication
auth = tweepy.OAuthHandler(creds['CONSUMER_KEY'], creds['CONSUMER_SECRET'])
auth.set_access_token(creds['ACCESS_TOKEN'], creds['ACCESS_SECRET'])
api = tweepy.API(auth)

df = pd.DataFrame(columns=[
    'Screen_Name',
    'User_Name',
    'Tweet_Created_At',
    'Tweet_Text',
    # How? - get only hashtag text
    'Hashtags',
    'User_Location',
    'Tweet_Coordinates',
    'Tweet_Place',
    'Retweet_Count',
    'Retweeted',
    'Favorite_Count',
    'Favorited',
    'Replied',
    # How? - get only expanded url?
    'Tweet_URL'
])

df
