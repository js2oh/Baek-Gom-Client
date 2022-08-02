const makeStyles = () => {
  return {
    root: {
      '& .MuiTextField-root': {
        margin: theme => theme.spacing(1),
      },
    },
    paper: {
      borderRadius: 4,
      padding: theme => theme.spacing(2),
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    fileInput: {
      width: '97%',
      margin: '10px 0',
    },
    buttonSubmit: {
      marginBottom: '10px',
    },
    uploadText: {
      marginBottom: '20px',
    }
  }
}

export default makeStyles;