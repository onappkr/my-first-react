import React from 'react';
import { createPortal } from 'react-dom';

function Modal({ children }) {
  const style1 = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const style2 = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
  };
  return createPortal(
    <div style={style1}>
      <div style={style2}>{children}</div>
    </div>,
    // , document.getElementById('modal-root'))
    document.body,
  );
}

export default Modal;
