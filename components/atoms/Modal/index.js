import React from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const Modal = ({ isOpen, onClose, children }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={onClose}></div>
      <div className={`${isDarkMode ? "modal-content-d" : "modal-content " } bg-white p-4 rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto z-50`}>
        {children}
      </div>
    </div>
  );
};

export default Modal;


