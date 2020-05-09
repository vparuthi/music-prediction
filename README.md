# music-predictor

A Flask web application that uses an XGBoost model to predict a user's favorite genre of music

Check out the active app [here](http://34.86.82.218/)!

## Installation

1) Clone repo 
2) Create a virtualenv 
3) Install requirements
    ```text
    pip3 install -r requirements.txt
    ```
4) Create a config.ini file in the following format:
    ```text
    [spotify api]
    CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXX
    CLIENT_SECRET=XXXXXXXXXXXXXXXXXXXXXXX
    ```
    Note: these keys can be obtained by creating a Spotify Developer account for free.
5) Run the app!
    ```text
    python3 app.py
    ```

## Dataset
[Kaggle Young People Survey](https://www.kaggle.com/miroslavsabo/young-people-survey)
