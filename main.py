import preprocessing
import model.mlknn
import json
import pickle

OPTIMIZED_MODEL_PARAMETERS_FILE_PATH = './resources/final_model_values.json'
FINAL_MLKNN_MODEL_FILE_PATH = './model/finalized_MLkNN_model.sav'


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
    # load the model from disk
    clf = pickle.load(open(FINAL_MLKNN_MODEL_FILE_PATH, 'rb'))

if __name__ == '__main__':
    main()
