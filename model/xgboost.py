from xgboost import XGBClassifier
import json
import preprocessing
from sklearn.multiclass import OneVsRestClassifier
import pickle
import pandas as pd

OPTIMIZED_MODEL_PARAMETERS_FILE_PATH = '/home/verabibj/music-prediction/resources/final_xgboost_model_values.json'
FINAL_XGBOOST_MODEL_FILE_PATH = '/home/verabibj/music-prediction/model/xgboost_model.sav'


def create_model(file_path=FINAL_XGBOOST_MODEL_FILE_PATH):
    """
    Creates and trains a OneVsRestClassifier(XGBClassifier()) using the optimized parameters found
    Saves this trained model to disk

    :param string file_path: specifies where the model should be saved
    :return: a trained OneVsRestClassifier
    """

    with open(OPTIMIZED_MODEL_PARAMETERS_FILE_PATH) as file:
        hyperparameters = json.load(file)['hyperparameters']

    question_data, music_data = preprocessing.load_data()
    question_data, music_data = preprocessing.preprocess_data(question_data, music_data)
    xgb_model = XGBClassifier(**hyperparameters)
    xgb_clf = OneVsRestClassifier(xgb_model, n_jobs=-1)
    xgb_clf.fit(question_data, music_data)
    pickle.dump(xgb_clf, open(file_path, 'wb'))
    return xgb_clf


def predict(xgb_clf, question_answers):
    """
    Predicts the genres of music that a user likes

    :param OneVsRestClassifier xgb_clf: a trained sklearn OneVsRestClassifier
    :param list question_answers: a list of integers containing user responses for each question
    :return: list of genres a user is predicted to like
    """

    with open(OPTIMIZED_MODEL_PARAMETERS_FILE_PATH) as file:
        features = json.load(file)['features']

    predict_df = pd.DataFrame(columns=features)
    predict_df.loc[len(predict_df)] = question_answers
    predict_df = predict_df.astype(int)

    return xgb_clf.predict(predict_df)[0].tolist()


def load_model(file_path=FINAL_XGBOOST_MODEL_FILE_PATH):
    """
    Loads the model from disk

    :param string file_path: specifies where to load a trained model from
    :return:
    """
    return pickle.load(open(file_path, 'rb'))