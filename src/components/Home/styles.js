const makeStyles = () => {
  return { 
    mainContainer: {
      marginTop: '120px',
      '@media screen and (max-width: 900px)': {
        marginTop: '170px',
      },
      '@media screen and (max-width: 600px)': {
        flexDirection: "column-reverse",
        marginTop: '150px',
      },
    },
    appBarSearch: {
      borderRadius: 4,
      marginBottom: '1rem',
      display: 'flex',
      padding: '16px',
    },
    pagination: {
      borderRadius: 4,
      marginTop: '1rem',
      padding: '16px',
      display: 'flex',
      justifyContent: 'center',
    },
    gridContainer: {
      '@media screen and (max-width: 600px)': {
        flexDirection: 'column-reverse',
      },
    },
  };
}

export default makeStyles;