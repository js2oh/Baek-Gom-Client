const makeStyles = () => {
  return { 
    appBar : {
      borderRadius: "15px",
      margin: '30px 0px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headings : {
      // darker
      // color: '#1A6CC1',
      // lighter
      color: '#2C81D9',
    },
    image : {
      marginLeft: '15px',
    },
    mainContainer : {
      '@media screen and (max-width: 900px)': {
        flexDirection: "column-reverse",
      },
    },
  };
}

export default makeStyles;