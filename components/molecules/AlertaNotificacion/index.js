// components/Notification.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = ({ message }) => {
  // Usar 'toast.info' directamente sin necesidad de envolverlo en un div
  toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });

  // Puedes devolver null o cualquier otro contenido aquí, ya que 'toast.info' mostrará la notificación directamente
  return null;
};

export default Notification;
