// theme.js
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: green[700],
    },
  },
  components: {
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
