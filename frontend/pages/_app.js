import { useState } from 'react';
import '../styles/reset.css';
import '../styles/globals.css';
import NavBar from '../components/NavBar/NavBar';
import Main from '../components/Main/Main';

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(undefined);

  const connect = u => setUser(u);

  return (
    <Main>
      <NavBar user={user} connect={connect} />
      <Component {...pageProps} user={user} />
    </Main>
  );
}
