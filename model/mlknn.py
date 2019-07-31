import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from skmultilearn.adapt import MLkNN
from sklearn.model_selection import GridSearchCV
import seaborn as sns
import matplotlib.pyplot as plt
import statistics
import scipy
from itertools import combinations
pd.options.mode.chained_assignment = None  # default='warn'
from multiprocessing import Pool
from itertools import repeat
from itertools import compress
import json

MUSIC_CHOICES = ['classical music', 'pop', 'metal or hardrock', 'hiphop, rap', 'latino', 'alternative']

