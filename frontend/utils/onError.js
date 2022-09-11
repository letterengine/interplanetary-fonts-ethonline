import toast from 'react-hot-toast';
import { ERROR_MESSAGE } from './constants';

const onError = (error) => {
  toast.error(error?.data?.message ?? error?.message ?? ERROR_MESSAGE);
};

export default onError;