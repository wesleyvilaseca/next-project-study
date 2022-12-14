import { Provider } from 'react-redux'
import { store } from '../src/store/store'
import { LightTheme } from '../src/themes'
import { ThemeProvider } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loading, Notify, AlertComponent, ConfirmComponent } from '../src/components';
import { GlobalStyle } from '../src/themes/GlobalStyle';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={LightTheme}>
        <GlobalStyle />
        {/* <ConfirmComponent
          open={true}
          onClose={() => alert('close')}
          onConfirm={() => alert('confirm')}
        /> */}
        <Loading />
        <Notify />
        <AlertComponent />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
