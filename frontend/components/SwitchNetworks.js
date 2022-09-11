import toast from 'react-hot-toast';
import { CHAIN_ID } from '../utils/constants';
import { useSwitchNetwork } from 'wagmi';

const SwitchNetwork = ({ className = '' }) => {
  const { switchNetwork } = useSwitchNetwork();

  return (
    <button
      className="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-orange-900"
      onClick={() => {
        if (switchNetwork) {
          switchNetwork(CHAIN_ID);
        } else {
          toast.error('Please change your network wallet!');
        }
      }}
    >
      Switch Network
    </button>
  );
};

export default SwitchNetwork;