from flask import Flask, jsonify, request
from flask_socketio import SocketIO
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(app)

# Conexión a MongoDB
client = MongoClient("mongodb://pigpig:0iEF&C84k4gqe&d&2D38%5EtNb&xln6d03hXLOGAcbY0LeRGUlGj@192.168.100.10:27017/")
db = client["basePruebaJesus"]
collection = db["alerta"]

# Ruta para obtener alertas
@app.route('/api/alertas', methods=['GET'])
def obtener_alertas():
    if request.method == 'OPTIONS':
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Authorization, X-Requested-With',
            }
            return ('', 204, headers)
    try:
        alertas = collection.find()
        return dumps(alertas)
    except Exception as e:
        return jsonify({'error': str(e)})

# Ruta para agregar una alerta
@app.route('/api/notificar', methods=['POST'])
def agregar_alerta():
    if request.method == 'OPTIONS':
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Authorization, X-Requested-With',
            }
            return ('', 204, headers)
    try:
        mensaje = request.json['mensaje']
        nueva_alerta = {'mensaje': mensaje}
        collection.insert_one(nueva_alerta)
        # Emitir evento de Socket.IO cuando se agrega una nueva alerta
        socketio.emit('nuevaAlerta', {'mensaje': '¡Nueva alerta disponible!'})
        return jsonify({'success': True, 'message': 'Alerta guardada correctamente'})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@socketio.on('connect')
def handle_connect():
    print('Cliente conectado a Socket.IO')
    
if __name__ == '__main__':
    socketio.run(app, debug=True)
