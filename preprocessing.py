import pandas as pd
import json

MUSIC_CHOICES = ['classical music', 'pop', 'metal or hardrock', 'hiphop, rap', 'latino', 'alternative']
DATA_FILE_PATH = './resources/responses.csv'
OPTIMIZED_MODEL_PARAMETERS_FILE_PATH = './resources/final_model_values.json'
THRESHOLD_TO_LIKE_A_GENRE = 4


def load_data():
    """
    Loads X and y data from resources using predetermined features
    Returns two DataFrames, X and y data
    :return: tuple(DataFrame, DataFrame)
    """

    raw_data = pd.read_csv(DATA_FILE_PATH)
    raw_data.fillna(0, inplace=True)
    raw_data.columns = [col.lower() for col in raw_data.columns]

    # using the features found to be the best predictors during the EDA process
    # further work can be seen in the music_prediction_eda jupyter notbook
    with open(OPTIMIZED_MODEL_PARAMETERS_FILE_PATH) as file:
        json_file = json.load(file)

    return raw_data[json_file['features']], raw_data[MUSIC_CHOICES]


def preprocess_data(question_data, music_data):
    """
    One Hot Encodes the X data and labels the y data

    :param DataFrame question_data: X data
    :param DataFrame music_data: y data
    :return: tuple(DataFrame, DataFrame)
    """
    # gender is binary so we convert that prior to OHE (One Hot Encoding)
    question_data.loc[:, ['gender']] = question_data[['gender']].applymap(lambda gender: 1 if gender == 'female' else 0)
    question_data = pd.get_dummies(question_data, drop_first=True).astype(int)

    music_data = music_data.applymap(lambda x: True if x >= THRESHOLD_TO_LIKE_A_GENRE else False)
    return question_data, music_data
