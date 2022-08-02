import { red, deepPurple } from '@mui/material/colors';

const makeStyles = () => {
  return { 
    appBar: {
      // borderRadius: 15,
      marginBottom: '30px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 50px 10px 50px',
      '@media screen and (max-width: 900px)': {
        flexDirection: 'column',
      },
    },
    image: {
      marginLeft: '10px',
      marginTop: '5px',
      '@media screen and (max-width: 600px)': {
        display: 'none',
      },
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    profile: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      '@media screen and (max-width: 900px)': {
        marginTop: '20px',
        justifyContent: 'center',
      },
    },
    userName: {
      marginLeft: theme => theme.spacing(3),
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      '@media screen and (max-width: 1200px)': {
        display: 'none',
      },
    },
    logout: {
      marginLeft: theme => theme.spacing(3),
      color: theme => theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
    },
    brandContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    purple: {
      color: theme => theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  };
}

export default makeStyles;
