# Import the modules
import os
import csv
import time
import tweepy
import requests
import json
import functools
import datetime as DT
import pandas as pd
import numpy as np
from opencage.geocoder import OpenCageGeocode
from pprint import pprint
from tweepy import OAuthHandler, Stream, API, Cursor
from pathlib import Path
import pymongo
from pymongo import MongoClient
# import twitter_credentials

# Load credentials from json file:
os.chdir(r"C:\Users\angy4\BootCamp-HW\d3-data-viz")  # Folder Location
with open("twitter_credentials.json", "r") as file:
    creds = json.load(file)

# Set up Twitter Authentication
CONSUMER_KEY = creds['CONSUMER_KEY']
CONSUMER_SECRET = creds['CONSUMER_SECRET']
ACCESS_TOKEN = creds['ACCESS_TOKEN']
ACCESS_SECRET = creds['ACCESS_SECRET']

auth = tweepy.OAuthHandler(creds['CONSUMER_KEY'], creds['CONSUMER_SECRET'])
auth.set_access_token(creds['ACCESS_TOKEN'], creds['ACCESS_SECRET'])
api = tweepy.API(auth)


def conjunction(*conditions):
    return functools.reduce(np.logical_and, conditions)


def DT_from_utc_to_local(utc_datetime):
    now_timestamp = time.time()
    offset = DT.datetime.fromtimestamp(
        now_timestamp) - DT.datetime.utcfromtimestamp(now_timestamp)
    return utc_datetime + offset


# Twitter Authentication
auth = tweepy.OAuthHandler(creds['CONSUMER_KEY'], creds['CONSUMER_SECRET'])
auth.set_access_token(creds['ACCESS_TOKEN'], creds['ACCESS_SECRET'])
api = tweepy.API(auth)


######## Open csv with user info ########
with open('ind_twitter_users.csv') as f:

    for line in f.readlines():
        array = line.split(',')
        first_item = array[0]

    num_columns = len(array)
    f.seek(0)

    reader = csv.reader(f, delimiter=',')
    username_col = [1]
    user_col = [2]
    ht_cols = [3]

    # SKip Header
    next(reader)

    # users array
    list_users = []
    # user id array
    user_id = []
    # hashtags array
    hashtags = []
    # user Twitter Screen name array
    screen_name = []

    # loop rows from specific column & save to var
    for row in reader:
        content = [row[i] for i in user_col]
        ht = [row[i] for i in ht_cols]
        scrname = [row[i] for i in username_col]
#         add if not in in list
        if not content in list_users:
            list_users.append(content)
            hashtags.append(ht)
            screen_name.append(scrname)
            users_arr = np.array(list_users)
            ht_arr = np.array(hashtags)

            for s in users_arr:
                # tHandle - user handle without the space before "@"
                tHandle = np.char.strip(users_arr, chars=' ')

#       Add if not in list
        if not screen_name in user_id:
            user_id.append(screen_name)

# pprint(user_id)

# csv to DataFrame
source_df = pd.read_csv('ind_twitter_users.csv', encoding="ISO-8859-1")

# Twitter Handle
user_df = source_df['Twitter Handle']

# Hashtags
hashtag_df = source_df['Slogan Hashtag']

#
# Amount of loops needed to pull x amount of tweets
loop = 2
# Count of tweets requested at a time
count = 100
# where tweets will be added to
listTw = []

# make initial request for most recent tweets (200 is the maximum allowed count)
new_tweets = api.user_timeline(screen_name=screen_name, count=200)

while loop > -1:

    def get_all_tweets(screen_name):

        # authorize twitter, initialize tweepy
        auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
        auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)
        api = tweepy.API(auth)

    # initialize a list to hold all the tweepy Tweets
        alltweets = []

    # # make initial request for most recent tweets (200 is the maximum allowed count)
    #     new_tweets = api.user_timeline(screen_name=screen_name, count=3200)

    # save most recent tweets
        alltweets.extend(new_tweets)

    # save the id of the oldest tweet less one
        oldest = alltweets[-1].id - 1

    # keep grabbing tweets until there are no tweets left to grab
    while len(new_tweets) > 0:

        print("getting tweets before %s" % (oldest))

    # all subsiquent requests use the max_id param to prevent duplicates
        new_tweets = api.user_timeline(
            screen_name=screen_name, count=200, max_id=oldest)

    # save most recent tweets
        alltweets.extend(new_tweets)

    # update the id of the oldest tweet less one
        oldest = alltweets[-1].id - 1

        print("...%s tweets downloaded so far" % (len(alltweets)))


# tweet.truncated reps whether tweet has been retweeted and is not original post
        outtweets = [{
            'Screen_Name': tweet.user.screen_name,
            'User_Name': tweet.user.name,
            'Tweet_Created_At': str(DT_from_utc_to_local(tweet.created_at)),
            'Tweet_Text': tweet.text,
            # How? - get only hashtag text
            'Hashtags': tweet.entities.get('hashtags'),
            'User_Location': str(tweet.user.location),
            'Tweet_Coordinates': str(tweet.coordinates),
            'Tweet_Place': str(tweet.place),
            'Retweet_Count': str(tweet.retweet_count),
            'Retweeted': str(tweet.retweeted),
            'Favorite_Count': str(tweet.favorite_count),
            'Favorited': str(tweet.favorited),
            'Replied': str(tweet.in_reply_to_status_id_str),
            # How? - get only expanded url?
            'Tweet_URL': tweet.entities.get('extended url')
        }
            for tweet in alltweets]

        with open('%s_tweets.json' % screen_name, 'a') as f:

            #             included_cols = [2]
            json_dumps = json.dumps(
                outtweets, indent=4, sort_keys=True, default=str)
            f.write(json_dumps)
            pprint(outtweets)

            pass

            listTw.append(outtweets)

            return listTw


if __name__ == '__main__':

    ###################### run for all users ##################################################
    for use in user_df:

        get_all_tweets(use)


####################### run for one user at a time #########################################
#     get_all_tweets("@BernieSanders")
#     df  = pd.DataFrame(alltweets)
#     df_all = pd.DataFrame()
#     df_all = pd.concat([df_all, df])
