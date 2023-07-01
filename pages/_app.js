import Layout from '../components/Layout'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return(
    <ChakraProvider>
      <Layout>
        <ToastContainer limit={1}/>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );

}

export default MyApp
