import { useState } from 'react';
import '../styles/reset.css';
import '../styles/globals.css';
import NavBar from '../components/NavBar/NavBar';
import Main from '../components/Main/Main';

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
