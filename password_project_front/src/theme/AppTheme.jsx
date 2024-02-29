import {ThemeProvider} from '@emotion/react';
import {CssBaseline} from '@mui/material';
import { purpleTheme } from './purpleTheme';
import '../styles.css';

export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={ purpleTheme }>
        <CssBaseline />

        {children}
    </ThemeProvider>
  )
}
