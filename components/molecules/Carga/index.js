import React from 'react';
import Image from 'next/image';

const ModalContent = ({ onClose }) => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h2>Constanza</h2>
        <button className="close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
      <div className="modal-body">
        <p>Seras redirigido a otra pagina para verificar Informacion</p>
        <Image
          src="/images/Constanzapensando.gif" // Ruta de tu imagen
          alt="carga"
          width={300} // Ajusta el ancho según tus necesidades
          height={300} // Ajusta la altura según tus necesidades
        />
      </div>
    </div>
  );
};

export default ModalContent;
