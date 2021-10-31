import type { AppProps } from 'next/app'; 
import '../sass/main.css'
import * as dotenv from 'dotenv';
import { AppWrapper } from '../context/sectionsContext'; // import based on where you put it
dotenv.config();

function MyApp({ Component, pageProps }: AppProps) {
    return (<AppWrapper>
    <Component {...pageProps} />
  </AppWrapper>)
 
}
export default MyApp
