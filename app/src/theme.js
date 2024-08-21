// theme.js
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import PretendardFont from './font/Pretendard.otf';


const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: green[700],
    },
  },
  typography: {
    fontFamily: 'Pretendard', // Set Pretendard as the default font
  },
  components: {
    MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Pretendard';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('Pretendard'), url(${PretendardFont}) format('opentype');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC,
                          U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, 
                          U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
        `,
      },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded corners
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: green[700],
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: green[700],
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: green[500],
            },
            '&:hover fieldset': {
              borderColor: green[700],
            },
            '&.Mui-focused fieldset': {
              borderColor: green[700],
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&:before': {
            borderColor: green[500],
          },
          '&:hover:not(.Mui-disabled):before': {
            borderColor: green[700],
          },
          '&:after': {
            borderColor: green[700],
          },
        },
        icon: {
          color: green[500],
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: green[700],
          },
        },
      },
    },
  },
});

export default theme;
