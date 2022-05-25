import Head from 'next/head';
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Kontrolla</title>
      </Head>
      <Component {...pageProps} />
    </>);
}

export default MyApp
