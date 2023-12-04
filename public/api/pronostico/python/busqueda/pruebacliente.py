import socketio

sio = socketio.Client()

@sio.event
def connect():
    print('Conectado al servidor')

@sio.event
def disconnect():
    print('Desconectado del servidor')

if __name__ == '__main__':
    try:
        sio.connect('http://localhost:5000', namespaces=['/'])

        while True:
            message = input("Escribe un mensaje para enviar: ")
            
            # Envia el mensaje como notificación
            sio.emit('notification', {'message': message}, namespace='/')
            print(f'Mensaje "{message}" enviado')

    except KeyboardInterrupt:
        sio.disconnect()
        print('Desconectado del servidor')
