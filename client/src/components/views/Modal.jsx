import '../styles/Modal.css';

const Modal = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className='overlay'>
      <div className='modal'>
        {children}
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
