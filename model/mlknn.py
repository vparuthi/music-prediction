import pandas as pd
import numpy as np
from skmultilearn.adapt import MLkNN


def create_model(question_data, music_data, k, s):
    """
    Creates and trains a MLkNN classifier

    :param DataFrame question_data: X data
    :param DataFrame music_data: y data
    :param int k: it is a MLkNN hyperparameter that represents number of neighbours compared to
    :param int s: it is a MLkNN hyperparameter known as the smoothing factor
    :return: a trained sklearn MLkNN classifier
    """
    clf = MLkNN(k=k, s=s)
    clf.fit(question_data.values, music_data.values)
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
