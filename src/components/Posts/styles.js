const makeStyles = () => {
  return {
    mainContainer: {
      display: 'flex',
      alignItems: 'center',
      // borderRadius: 15,
      // margin: '30px 0',
      // display: 'flex',
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'center',
      // padding: '10px 50px',
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    smMargin: {
      margin: theme => theme.spacing(1),
    },
    actionDiv: {
      textAlign: 'center',
    },
  };
}

export default makeStyles;