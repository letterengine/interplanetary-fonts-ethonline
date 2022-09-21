import { useState } from 'react';
import '../styles/reset.css';
import '../styles/globals.css';
// Components
import NavBar from '../components/UI/NavBar';
import Main from '../components/UI/Main';

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(undefined),
    [connectButton, setConnectButton] = useState('Connect');

  const connect = u => {
    setUser(u);
    setConnectButton(u.address.slice(0, 3) + '...' + u.address.slice(-3));
  };

  return (
    <Main>
      <NavBar user={user} connect={connect} connectButton={connectButton} />
      <Component {...pageProps} user={user} />
    </Main>
  );
}
