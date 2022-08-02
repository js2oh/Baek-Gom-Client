const makeStyles = () => {
  return {
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      borderRadius: '15px',
      marginTop: '120px',
      '@media screen and (max-width: 900px)': {
        marginTop: '170px',
      },
      '@media screen and (max-width: 600px)': {
        marginTop: '150px',
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      '@media screen and (max-width: 600px)': {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    divider: {
      margin: '40px 0 20px 0',
    },
    media: {
      borderRadius: '20px',
      objectFit: 'cover',
      width: '100%',
      maxHeight: '600px',
    },
    card: {
      display: 'flex',
      width: '60%',
      '@media screen and (max-width: 600px)': {
        width: '80%',
        flexWrap: 'wrap',
        flexDirection: 'column',
      },
    },
    section: {
      borderRadius: '20px',
      margin: '10px',
      flex: 1,
    },
    imageSection: {
      marginLeft: '20px',
      width: '40%',
      '@media screen and (max-width: 600px)': {
        width: '80%',
        marginLeft: 0,
      },
    },
    recommendedPosts: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: '40px',
      '@media screen and (max-width: 600px)': {
        flexDirection: 'column',
        flexWrap: 'none',
        alignItems: 'center',
      },
    },
    recommendedPost: {
      margin: '10px', cursor: 'pointer',
      width: "10%",
      '@media screen and (max-width: 1200px)': {
        width: '25%',
      },
      '@media screen and (max-width: 900px)': {
        width: '40%',
      },
      '@media screen and (max-width: 600px)': {
        width: '80%',
      },
    },
    imgContainer: {
      overflow: 'hidden',
      borderRadius: '20px',
    },
    recommendedImg: {
      borderRadius: '20px',
      height: '100px',
      width: '100%',
      transition: 'transform 1s, filter 1s ease-in-out',
      transformOrigin: 'center center',
      '&:hover': {
        transform: 'scale(1.3)',
      },
      '@media screen and (max-width: 1200px)': {
        height: '125px',
      },
      '@media screen and (max-width: 900px)': {
        height: '150px',
      },
      '@media screen and (max-width: 600px)': {
        height: '80%',
      },
    },
    loadingPaper: {
      display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
      marginTop: '120px',
      '@media screen and (max-width: 900px)': {
        marginTop: '170px',
      },
      '@media screen and (max-width: 600px)': {
        marginTop: '150px',
      },
    },
  }
};

export default makeStyles;