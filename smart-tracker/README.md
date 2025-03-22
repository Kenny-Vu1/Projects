
# Smart Tracker Command Line Input

Command line tool that tracks tasks.  
Stores tasks, tracks frequency of task within 7 days.  

---

## Features
- Add events with custom type, details, and date (defaults to today)
- Recaps frequency of events based on tasks input
- View events by dates
  
---

## How to Run
```bash
python main.py add Run "Run 3 miles" 2025-03-25
python main.py add Run "Run 4 miles" 
python main.py view
python main.py recap Run
python main.py clear