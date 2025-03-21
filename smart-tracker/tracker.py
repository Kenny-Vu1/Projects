import json
import os

def add_event(event_type, title, date):
    """adds an event to tracker"""

    events = dict()
    events["type"] = event_type
    events["title"]= title
    events["date"] = date

    if os.stat("data.json").st_size == 0:
        data = []
    else:
        with open("data.json", "r")as f:
            data = json.load(f)

    data.append(events)

    with open("data.json", "w")as f:
        json.dump(data, f, indent=2)

def view():
    """view data in json file"""
    pass

    if os.stat("data.json").st_size == 0:
        print(f"There are no events listed")
        exit()
    else:
        with open("data.json", "r")as f:
            data = json.load(f)
        
    for entry in data:
        print(f'Type: {entry["type"]} Title: {entry["title"]} Date: {entry["date"]}')