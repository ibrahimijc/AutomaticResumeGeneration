import '../styles/globals.css';
import '../styles/style.css';

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { GLOBAL_MUI_THEME } from '../styles/global.theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Provider } from 'react-redux'
import { store } from '../stores/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={GLOBAL_MUI_THEME}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
          <Component {...pageProps} />
            <Analytics />
            </Provider>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
