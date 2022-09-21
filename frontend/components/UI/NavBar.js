import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/logoHeader.svg';
import classes from '../../styles/NavBar.module.css';
// Components
import ConnectButton from './ConnectButton';
import ConnectedMenu from './ConnectedMenu';

export default function NavBar(props) {
  const [navbarOpen, setNavbarOpen] = useState(false),
    [menu, setMenu] = useState(false);

  // Event handlers
  const handleConnectedMenu = () => {
    if (props.connected) {
      setMenu(pastMenu => !pastMenu);
    } else {
      props.connect();
    }
  };

  const handleDisconnect = () => {
    props.disconnect();
    setMenu(false);
  };

  return (
    <nav className={classes.nav}>
      <div className='container px-4 mx-auto flex flex-wrap items-center justify-center lg:justify-between'>
        <div className='w-full relative flex justify-between  sm:justify-between lg:w-auto lg:static lg:block lg:justify-start'>
          <Link href='/'>
            <a>
              <Image
                src={logo}
                alt='InterplanetaryFonts'
                width={78.91}
                height={100}
                className={classes.logo}
              />
            </a>
          </Link>
          <p>InterplanetaryFonts</p>
          <button
            className='text-darkblue cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
            type='button'
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-10 h-10'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          </button>
        </div>
        <div
          className={
            'w-2/3 flex  lg:flex justify-between' +
            (navbarOpen ? ' flex' : ' hidden')
          }
        >
          <div>
            <input
              type='text'
              className='text-md w-72 border-2 px-4 py-2 border-darkblue rounded-full border-dashed text-darkblue-100 placeholder-darkblue hover:border-solid  hover:border-darkblue  focus:border-darkblue  focus:border-solid focus:outline-none '
              placeholder='Search Fonts in the Universe'
            ></input>
          </div>
          <ConnectButton
            user={props.user}
            connected={props.connected}
            buttonText={props.buttonText}
            onClick={handleConnectedMenu}
          />
          {props.connected && (
            <ConnectedMenu
              menu={menu}
              user={props.user}
              handleDisconnect={handleDisconnect}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
