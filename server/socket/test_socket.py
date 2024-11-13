import socketio

sio = socketio.Client()

sio.connect('http://localhost:3000')

@sio.on("currentState")
def on_current_state(data):
    print("Received current state:", data)

@sio.on("refreshDisplay")
def on_refresh_display():
    print("Display refreshed")

@sio.on("swipeLeft")
def on_swipe_left():
    print("Swiped left")

@sio.on("swipeRight")
def on_swipe_left():
    print("Swiped right")

@sio.on("stop")
def on_stop():
    print("Stopped")

# Emit events to the server
def test_api():
    sio.emit("setLyricAction", {"currentLyric": "2"})
    
    sio.emit("swipeLeftAction")
    
    sio.emit("swipeRightAction")
     
    sio.emit("getCurrentStateAction")
    
    sio.emit("refreshDisplayAction")

    sio.emit("stopAction")

    sio.emit("getCurrentStateAction")

test_api()
sio.wait()
