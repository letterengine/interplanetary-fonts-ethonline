import { useState, useEffect } from 'react';
import '../styles/reset.css';
import '../styles/globals.css';

// Connect wallet modules
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

// Wallet connect objects
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [infuraProvider({ infuraId }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: 'frontend',
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

// Components
import NavBar from '../components/UI/NavBar';
import Main from '../components/UI/Main';
import Notification from '../components/UI/Notification';

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
    created: [
      { txt: 'Sans Serif', url: '/font/test-font' },
      { txt: 'Serif', url: '/font/test-font' },
      { txt: 'Display', url: '/font/test-font' },
    ],
    collabs: [
      {
        txt: 'Other User Project FontStream',
        url: '/font/test-font',
        cstatus: true,
      },
      {
        txt: 'Other User Project FontStream',
        url: '/font/test-font',
        cstatus: false,
      },
    ],
    treasury: {
      balance: 3260.1,
      fontStreams: [
        { txt: 'Some FontStream', ammount: 32.15 },
        { txt: 'Some FontStream', ammount: 78.2 },
      ],
    },
    collected: [{ txt: 'Some Font Collected', url: '/font/test-font' }],
    funded: [{ txt: 'Some Font Stream', url: '/font/test-font' }],
  },
  fakeFont = {
    nme: 'Paradisio',
    cssname: 'Paradisio',
    style: 'normal',
    weight: 400,
    creators: [
      {
        username: 'gutentype',
        address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      },
    ],
    description: 'Badass Sans Serif Latin Font with English support',
    ipfs: 'https://ipfs.io/ipfs/QmWC2TeLHdDpKCu8Rip4fjZv1yXvgLBvp8AV7oa54Ajsf6?filename=Paradisio-IF.otf',
    format: 'format',
    streams: ['Add ligatures', 'Add French Support'],
    collected: [
      {
        username: 'gutentype',
        address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      },
    ],
    specimen: [
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'abcdefghijklmnopqrstuvwxyz',
      '0123456789#?!&·()-.,',
    ],
    preselect: ['Custom', 'Uppercase', 'Lowercase', 'Complete'],
    charset:
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#?!&·()-.,',
    price: 0.5,
  };

export default function MyApp({ Component, pageProps }) {
  const [font] = useState(fakeFont),
    [user] = useState(fakeUser),
    [connected, setConnected] = useState(true),
    [cNotification, setCNotification] = useState(0);

  // Toggle comment to use simple fake data object
  /*
  const [buttonText, setButtonText] = useState('Connect');
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
  */

  const handleConnected = bool => {
      setConnected(bool);
    },
    loadFonts = async () => {
      const font = new FontFace(props.font.nme, `url(${props.font.ipfs})`, {
        style: props.font.style,
        weight: props.font.weight,
      });
      // wait for font to be loaded
      await font.load();
      // add font to document
      document.fonts.add(font);
      // enable font with CSS class
      document.body.classList.add('fonts-loaded');
    };

  useEffect(() => {
    const pushNotification = setInterval(() => {
      setCNotification(
        prevNotifications => prevNotifications + Math.trunc(Math.random() * 5)
      );
    }, 20000);
    return () => clearInterval(pushNotification);
  }, [cNotification]);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: '#ff3b6a',
          accentColorForeground: '#ffffdd',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'none',
        })}
        modalSize='compact'
      >
        <Main>
          <NavBar handleConnected={handleConnected} />
          <Component
            {...pageProps}
            font={font}
            user={user}
            connected={connected}
          />
          {connected ? (
            <Notification
              message={`You have ${cNotification} EPNS notification${
                cNotification <= 1 ? '' : 's'
              }`}
            />
          ) : (
            ''
          )}
        </Main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
