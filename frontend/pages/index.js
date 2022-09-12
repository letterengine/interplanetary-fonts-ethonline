import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// Components
import Gallery from "../components/Gallery/Gallery";

export default function Home() {
  return (
    <div>
      <Head>
        <title>InterplanetaryFonts</title>
        <meta
          name="description"
          content="Web App created during ETHOnline 2022"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>Interplanetary Fonts</h1>
      </header>
      <Gallery />
    </div>
  );
}
