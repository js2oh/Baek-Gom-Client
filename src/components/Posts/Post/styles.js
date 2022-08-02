const makeStyles = () => {
  return {
    postImage: {
      overflow: 'hidden',
    },
    media: {
      height: "0px",
      // normal image
      paddingTop: '56.25%',
      // enlarged image
      // paddingTop: '65.25%',
      // bright zoom-in animation
      transition: 'transform 1s, filter 1s ease-in-out',
      transformOrigin: 'center center',
      filter: 'brightness(50%)',
      // normal zoom-in animation
      // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      // backgroundBlendMode: 'darken',
      // transition: 'transform .5s ease',
      '&:hover': {
        // bright zoom-in animation
        filter: 'brightness(80%)',
        transform: 'scale(1.3)',
        // normal zoom-in animation
        // transform: 'scale(1.5)',
      },
    },
    border: {
      border: 'solid',
    },
    fullHeightCard: {
      height: '100%',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: '15px',
      height: '100%',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'white',
    },
    overlay2: {
      position: 'absolute',
      top: '20px',
      // right: '20px',
      right: '0px',
      color: 'white',
    },
    grid: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      justifyContent: 'space-between',
      // margin: '20px',
      margin: '10px 20px',
    },
    title: {
      padding: '0 16px',
    },
    cardActions: {
      padding: '0 16px 8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    cardAction: {
      display: 'block',
      textAlign: 'initial',
    },
  };
}

export default makeStyles;