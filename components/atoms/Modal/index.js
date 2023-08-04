import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-overlay absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="modal-content bg-white p-4 rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
};

export default Modal;


