import React from 'react';
import { useDarkMode } from '@/context/DarkModeContext';

const Modal = ({ isOpen, onClose, children }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-overlay absolute inset-0 bg-black opacity-50 h-[120%]" onClick={onClose}></div>
      <div className={`${isDarkMode ? "modal-content-d" : "modal-content " } bg-white p-4 rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto`}>
        {children}
      </div>
  </div>
  );
};

export default Modal;


