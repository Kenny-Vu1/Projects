import json
import os
import time
import sys
from utils import load_data

def add_event(event_type, title):
    """adds an event to tracker"""

    if len(sys.argv) < 5:
        date = time.strftime("%Y-%m-%d")
    else:
        date = sys.argv[4]
    events = { 
        "type" :event_type,
        "title": title,
        "date" : date
    }

    data = load_data()
    data.append(events)

    with open("data.json", "w")as f:
        json.dump(data, f, indent=2)
    
def view():
    """view data in json file"""

    data = load_data()
    if not data:
        print("There are no events on file")
        exit()
    for entry in data: 
        print(f'''Type: {entry["type"]}\n    Details: {entry["title"]}\n    Date: {entry["date"]}''')

def clear():
    """Clears json data"""
    data = load_data()
    if not data:
        print("There are no events on file")
        exit()
    else:
        with open("data.json", "w")as f:
            f.write("[]")

def recap(event_type):
    """prints the number of times event was done within the last 7 days"""
    week = time.time()
    week -= 604800 #seconds in a week
    week = time.strftime("%Y-%m-%d", time.localtime(week))

    data = load_data()
    if not data:
        print("There are no events on file")
        exit()

    frequency = 0
    for entry in data:
        if entry["date"]> week and entry["type"] == event_type:
            frequency +=1

    print(f"You completed a {event_type} {frequency} times within the last 7 days.")
    print(f"Suggest to do {event_type} {round(frequency*0.75)}-{round(frequency*1.5)} for the week")