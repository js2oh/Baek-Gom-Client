const makeStyles = () => {
  return {
    paper: {
      marginTop: theme => theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme => theme.spacing(2),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme => theme.spacing(1),
      },
    },
    avatar: {
      margin: theme => theme.spacing(1),
      backgroundColor: theme => theme.palette.error.light,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: '24px',
    },
    submit: {
      margin: theme => theme.spacing(3, 0, 2),
    },
    googleButton: {
      // mb: theme => theme.spacing(2),
      marginBottom: '16px',
    },
  }
};

export default makeStyles;