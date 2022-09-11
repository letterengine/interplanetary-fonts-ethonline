import '../styles/reset.css';
import '../styles/globals.css';

import { Toaster } from 'react-hot-toast';
import Providers from '../components/Providers';

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </Providers>
  );
}

export default MyApp;
