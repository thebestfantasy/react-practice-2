import Modal from 'react-modal';

const customStyles = {
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const MyModal = ({ modalIsOpen, closeModal, src, tag }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <img src={src} alt={tag} />
    </Modal>
  );
};

export default MyModal;
