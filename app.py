from model import mlknn, xgboost
import json
from flask import Flask, render_template, url_for, request, current_app, redirect, jsonify
import csv
from itertools import compress
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import configparser

FINAL_MLKNN_MODEL_VALUES = './resources/final_mlknn_model_values.json'
FINAL_XGBOOST_MODEL_VALUES = './resources/final_xgboost_model_values.json'
SPOTIFY_SEARCH_API_URL = 'https://api.spotify.com/v1/search?q='
CONFIG_FILE_PATH = 'config.ini'
DEFAULT_NUMBER_OF_QUESTION_RESPONSE_OPTIONS = 5
# CATEGORICAL_QUESTIONS is a dict where value is the question, key is the number of categories
CATEGORICAL_QUESTIONS = {'Gender': ['M', 'F']}
app = Flask(__name__)


@app.route('/process_survey', methods=['POST'])
def process_survey():
    spotify_api_results = {}
    config = configparser.ConfigParser()
    config.read(CONFIG_FILE_PATH)
    spotify_api_keys = config['spotify api']

    form_values = list(map(int, json.loads(request.form['responseValues']).values()))
    predicted_values = xgboost.predict(current_app.model, form_values)
    genres = list(compress(current_app.genres, predicted_values))

    client_credentials_manager = SpotifyClientCredentials(client_id=spotify_api_keys['CLIENT_ID'],
                                                          client_secret=spotify_api_keys['CLIENT_SECRET'])
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    for genre in genres:
        genre_top_six = []
        playlists = sp.search(q=genre, type='playlist', limit=20).get('playlists').get('items')
        playlist_index = 0
        while len(genre_top_six) < 6:
            if playlist_index < len(playlists):
                if playlists[playlist_index].get('owner').get('display_name') == 'Spotify':
                    genre_top_six.append(playlists[playlist_index])
                playlist_index += 1
            else:
                break
        spotify_api_results[genre] = genre_top_six

    return render_template('results.html', genres=spotify_api_results)


@app.route('/')
def index():
    with open(FINAL_XGBOOST_MODEL_VALUES) as file:
        questions = json.load(file)['features']
    with open('./resources/columns.csv', mode='r') as infile:
        reader = csv.reader(infile)
        question_correlations = dict((rows[1], rows[0]) for rows in reader)
    questions = [question_correlations[question.capitalize().replace('.', '')] for question in questions]
    questions_and_options = []
    for question in questions:
        if question in CATEGORICAL_QUESTIONS:
            questions_and_options.append([question, CATEGORICAL_QUESTIONS[question]])
        else:
            questions_and_options.append([question, list(range(DEFAULT_NUMBER_OF_QUESTION_RESPONSE_OPTIONS+1))])

    return render_template('survey.html', questions=questions_and_options)


def main():
    clf = xgboost.load_model()
    with open(FINAL_XGBOOST_MODEL_VALUES) as file:
        genres = json.load(file)['genres']
    app.model = clf
    app.genres = genres
    app.run(host='0.0.0.0', port='8080')


if __name__ == '__main__':
    main()
