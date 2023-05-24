import '@/styles/globals.css'
import Context from "./context";
import Layout from '@/components/Layout';
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Context>
        <Layout>
          <NextNProgress />
          <Component {...pageProps} />
        </Layout>
      </Context>
    </>
  );
}
