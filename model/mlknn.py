import numpy as np
from skmultilearn.adapt import MLkNN
import preprocessing
import json
import pickle

OPTIMIZED_MODEL_PARAMETERS_FILE_PATH = './resources/final_model_values.json'
FINAL_MLKNN_MODEL_FILE_PATH = './model/finalized_MLkNN_model.sav'


def create_model(file_path=FINAL_MLKNN_MODEL_FILE_PATH):
    """
    Creates and trains a MLkNN classifier using the optimized parameters found
    Saves this trained model to disk

    :param string file_path: specifies where the model should be saved
    :return: a trained sklearn MLkNN classifier
    """

    with open(OPTIMIZED_MODEL_PARAMETERS_FILE_PATH) as file:
        hyperparameters = json.load(file)['hyperparameters']

    question_data, music_data = preprocessing.load_data()
    question_data, music_data = preprocessing.preprocess_data(question_data, music_data)
    clf = MLkNN(k=hyperparameters['k'], s=hyperparameters['s'])
    clf.fit(question_data.values, music_data.values)
    pickle.dump(clf, open(file_path, 'wb'))
    return clf


def predict(clf, question_answers):
    """
    Predicts the genres of music that a user likes

    :param MLkNN_model clf: a trained sklearn MLkNN classifier
    :param list question_answers: a list of integers containing user responses for each question
    :return:
    """

    # clf.predict() returns a sparse matrix and toarray() is utilized to convert it to a list
    return list(clf.predict(np.asarray([question_answers])).toarray()[0])


def load_model(file_path=FINAL_MLKNN_MODEL_FILE_PATH):
    """
    Loads the model from disk

    :param string file_path: specifies where to load a trained model from
    :return:
    """
    return pickle.load(open(file_path, 'rb'))
