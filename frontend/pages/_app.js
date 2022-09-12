import "../styles/reset.css";
import "../styles/globals.css";
import NavBar from "../components/NavBar/NavBar";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
