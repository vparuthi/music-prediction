import preprocessing
import model.mlknn
import json
import pickle
from flask import Flask, render_template, url_for, request
import csv
from itertools import compress
import requests
import config

OPTIMIZED_MODEL_PARAMETERS_FILE_PATH = './resources/final_model_values.json'
FINAL_MLKNN_MODEL_FILE_PATH = './model/finalized_MLkNN_model.sav'
SPOTIFY_SEARCH_API_URL = 'https://api.spotify.com/v1/search?q='
app = Flask(__name__)


@app.route('/process_survey', methods=['POST'])
def process():
    form_values = request.form
    clf = pickle.load(open(FINAL_MLKNN_MODEL_FILE_PATH, 'rb'))
    predicted_values = model.mlknn.predict(clf, list(form_values.values()))
    with open(OPTIMIZED_MODEL_PARAMETERS_FILE_PATH) as file:
        genres = json.load(file)['genres']
    genres = list(compress(genres, predicted_values))
    spotify_api_results = []
    return requests.get(SPOTIFY_SEARCH_API_URL + 'hip hop and rap'.replace(' ', '+') + '&type=playlist', headers={'Authorization': config.SPOTIFY_WEB_API_SECRET_KEY})
    # for genre in genres:

    return ', '.join(str(x) for x in genres)


@app.route('/')
def index():
    with open(OPTIMIZED_MODEL_PARAMETERS_FILE_PATH) as file:
        questions = json.load(file)['features']
    with open('./resources/columns.csv', mode='r') as infile:
        reader = csv.reader(infile)
        question_correlations = dict((rows[1], rows[0]) for rows in reader)
    questions = [question_correlations[question.capitalize()] for question in questions]
    return render_template('index.html', questions=questions)


def create_new_model():
    with open(OPTIMIZED_MODEL_PARAMETERS_FILE_PATH) as file:
        hyperparameters = json.load(file)['hyperparamters']

    question_data, music_data = preprocessing.load_data()
    question_data, music_data = preprocessing.preprocess_data(question_data, music_data)
    clf = model.mlknn.create_model(question_data, music_data, hyperparameters['k'], hyperparameters['s'])
    # save the model to disk
    filename = FINAL_MLKNN_MODEL_FILE_PATH
    pickle.dump(clf, open(filename, 'wb'))


def main():
    app.run(debug=True)
    # load the model from disk

if __name__ == '__main__':
    main()
