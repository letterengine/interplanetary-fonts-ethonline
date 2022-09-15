import React from 'react';
import Image from 'next/image';
import logo from '../../public/logoHeader.svg';
import Link from 'next/link';

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

export default function NavBar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const handleConnect = () => {
    props.connect(fakeUser);
  };

  return (
    <nav className='flex flex-wrap items-center justify-between px-2 py-3 bg-white mb-10'>
      <div className='container px-4 mx-auto flex flex-wrap items-center justify-center lg:justify-between'>
        <div className='w-full relative flex justify-between  sm:justify-between lg:w-auto lg:static lg:block lg:justify-start'>
          <a href='/'>
            <Image
              src={logo}
              alt='Interplanetary Fonts'
              width={78.91}
              height={100}
            />
          </a>
          <p>Interplanetary Fonts</p>
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
          <Link href='/profile'>
            <button
              onClick={handleConnect}
              className='w-56 border-2 px-4 py-2  bg-red border-red rounded border-solid hover:border-solid text-white text-md hover:text-darkblue hover:border-darkblue focus:outline-none '
            >
              Connect
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
