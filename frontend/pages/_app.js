import { useState } from 'react';
import '../styles/reset.css';
import '../styles/globals.css';
// Components
import NavBar from '../components/UI/NavBar';
import Main from '../components/UI/Main';

// Dummy Data
const fakeUser = {
  username: 'gutentype',
  address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  avatar: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Gutenberg.jpg',
  following: 0,
  followers: 1439,
  website: 'https://type-papa.xyz',
  about:
    'Johannes Gensfleisch zur Laden zum Gutenberg was a German inventor, printer, publisher, and goldsmith who introduced printing to Europe with his mechanical movable-type printing press.',
  social: [
    { icon: 'RD', url: 'https://app.radicle.xyz/gutentype' },
    { icon: 'GH', url: 'https://github.com/gutentype' },
    { icon: 'TW', url: 'https://twitter.com/gutentype' },
    { icon: 'TG', url: 'https://t.me/gutentype' },
    { icon: 'DC', url: 'https://discordapp.com/users/gutentype#5922' },
    { icon: 'IG', url: 'https://www.instagram.com/gutentype' },
  ],
};

export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(undefined),
    [connected, setConnected] = useState(false),
    [buttonText, setButtonText] = useState('Connect');

  // Event handlers
  const connect = () => {
      setUser(fakeUser);
      setConnected(true);
      setButtonText(
        `${fakeUser.address.slice(0, 3)}...${fakeUser.address.slice(-3)}`
      );
    },
    disconnect = () => {
      setUser(undefined);
      setConnected(false);
      setButtonText('Connect');
    };

  return (
    <Main>
      <NavBar
        user={user}
        connected={connected}
        connect={connect}
        disconnect={disconnect}
        buttonText={buttonText}
      />
      <Component {...pageProps} user={user} connected={connected} />
    </Main>
  );
}
