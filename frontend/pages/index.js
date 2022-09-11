import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import ConnectButton from '../components/ConnectButton';

export default function Home() {
  return (
    <div className={styles.app}>
      <Head>
        <title>InterplanetaryFonts</title>
        <meta
          name='description'
          content='Web App created during ETHOnline 2022'
        />
        <link rel='apple-touch-icon' href='/logo192.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className={styles.header}>
        <ConnectButton />
        <div className={styles.logoWrap}>
          <Image
            src='/logo.svg'
            className={styles.logo}
            alt='logo'
            layout='responsive'
            width={400}
            height={400}
          />
        </div>
      </header>
    </div>
  );
}
