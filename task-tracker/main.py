
import sys
from tracker import add_event, clear, view, recap

if __name__ == "__main__":
    if sys.argv[1] == "add":
        event_type = sys.argv[2]
        details = sys.argv[3]
        add_event(event_type, details)

    if sys.argv[1] =="view":
        view()
    
    if sys.argv[1] =="clear":
        clear()

    if sys.argv[1] =="recap":
        if sys.argv[2]: print(recap(sys.argv[2]))
        else: print("Add type to commandline")