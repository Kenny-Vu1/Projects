import json
import os
import time

def add_event(event_type, title, date):
    """adds an event to tracker"""

    events = { 
        "type" :event_type,
        "title": title,
        "date" : date
    }

    if  not os.path.exists("data.json") or (os.stat("data.json").st_size == 0):
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
        print(f'''Type: {entry["type"]}\n    Title: {entry["title"]}\n    Date: {entry["date"]}''')

def clear():
    """Clears json data"""
    if os.stat("data.json").st_size == 0:
        print(f"There are no events listed")
        exit()
    else:
        with open("data.json", "w")as f:
            f.write("[]")

# def follow_up():
#     pass

def recap(event_type):
    """prints the number of times event was done within the last 7 days"""
    week = time.time()
    week -= 604800 #seconds in a week
    week = time.strftime("%Y-%m-%d", time.localtime(week))

    if os.stat("data.json").st_size == 0:
        print(f"There are no events listed")
        exit()
    else:
        with open("data.json", "r")as f:
            data = json.load(f)

    frequency = 0
    for entry in data:
        if entry["date"]> week and entry["type"] == event_type:
            frequency +=1

    print(f"You completed a {event_type} {frequency} times within the last 7 days. ✅")
    print(f"Suggest to do {event_type} {round(frequency*0.75)}-{round(frequency*1.5)} for the week")