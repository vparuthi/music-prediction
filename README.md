# music-predictor

A Flask web application that uses an xgboost model to predict a user's favorite genre of music

[Active App Link (Click Me!)](http://35.203.81.177:8080/)

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
5) Run the app!
    ```text
    python3 app.py
    ```

## Dataset
[Kaggle Young People Survey](https://www.kaggle.com/miroslavsabo/young-people-survey)
