from flask import Flask, render_template, request, redirect, url_for
import json
import os
from datetime import datetime
from utils import load_data, save_data
import tracker

app = Flask(__name__)

@app.route("/")
def homepage():
    events = load_data()
    events.sort(key=lambda e: e["date"])
    return render_template("index.html", events=events)

@app.route("/add", methods =["POST"])
def add():
    event_type = request.form["type"]
    description = request.form["description"]
    date = request.form["date"] or datetime.today().strftime('%Y-%m-%d')

    event = {"type": event_type, "description": description, "date": date}
    data = load_data()
    data.append(event)
    save_data(data)

    return redirect("/")

@app.route("/clear", methods =["POST"])
def clear():
    tracker.clear()
    return redirect("/")

@app.route("/recap", methods=["POST"])
def recap():
    event_type = request.form["recap_type"]
    recap = tracker.recap(event_type)
    return render_template("recap.html", recap=recap)

if __name__ ==  "__main__":
    app.run(debug=True)

