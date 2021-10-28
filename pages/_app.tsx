import type { AppProps } from 'next/app'; 
import './sass/main.css';
import * as dotenv from 'dotenv';

dotenv.config();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
