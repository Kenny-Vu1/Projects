
import sys
from tracker import add_event, view, suggest

if __name__ == "__main__":
    if sys.argv[1] == "add":
        event_type = sys.argv[2]
        title = sys.argv[3]
        date = sys.argv[4]
        add_event(event_type, title, date)

    if sys.argv[1] =="view":
        view()

    if sys.argv[1] =="suggest":
        suggest()