import Layout from '../components/Layout'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  return(
    <Layout>
      <ToastContainer limit={1}/>
      <Component {...pageProps} />
    </Layout>
  );

}

export default MyApp
