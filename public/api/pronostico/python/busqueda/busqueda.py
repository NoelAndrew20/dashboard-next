from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={r"/socket.io/*": {"origins": "*"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('notification', namespace='/')
def handle_notification(message):
    print('Notificación recibida:', message)

@socketio.on('testEvent', namespace='/')
def handle_test_event(data):
    print('Evento de prueba recibido:', data)

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5004)
