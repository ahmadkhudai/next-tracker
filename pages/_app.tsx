import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {HomePage} from "./Home/HomePage";


function MyApp({ Component, pageProps }: AppProps) {
  return (
     <HomePage/>
  )
}

export default MyApp
