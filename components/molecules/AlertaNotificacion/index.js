// components/Notification.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = ({ message }) => {
  return (
    <div>
      {toast.info(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })}
    </div>
  );
};

export default Notification;
