import os
import json

def load_data():
    """loads json data (returns list from json)"""
    if  not os.path.exists("data.json") or (os.stat("data.json").st_size == 0):
        data = []
    else:
        with open("data.json", "r")as f:
            data = json.load(f)
    return data