import { useState } from 'react';
import Modal from './Modal';
import Login from './Login';

export default function ConnectButton() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <Modal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      >
        <Login />
      </Modal>
      <button
        className="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-orange-900"
        onClick={() => {
          setShowLoginModal(!showLoginModal);
        }}
      >
        Connect
      </button>
    </>
  );
}