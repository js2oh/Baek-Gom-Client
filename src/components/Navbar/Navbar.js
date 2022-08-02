import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { googleSignin as staySignedin, logout } from '../../actions/auth';

import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import styled from '@emotion/styled';

import mascot from '../../img/mascot.png';
import title from '../../img/title.png';
import makeStyles from './styles';

import jwt_decode from 'jwt-decode';

const navBarStyles = makeStyles();
const LogoImg = styled.img(navBarStyles.image);
const DivBrandContainer = styled.div(navBarStyles.brandContainer);
const DivProfile = styled.div(navBarStyles.profile);

const NavBar = () => {
  const user = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("NavBar is Rendered")
  console.log("NavBar user: ", user)
  console.log("NavBar location: ", location)

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    console.log("useEffect NavBar Persistent Login")
    // reload login status into redux after navigating or refreshing
    const liveUser = JSON.parse(localStorage.getItem('profile'));
    if (liveUser) dispatch(staySignedin(liveUser.result, liveUser.token));

    // logout the user when token expires after navigating or refreshing
    const token = liveUser?.token;
    if (token && jwt_decode(token).exp * 1000 < Date.now()) {
      dispatch(logout());
    }
  }, [location, dispatch]);

  return (
    <AppBar sx={navBarStyles.appBar} position="fixed" color="inherit">
      <DivBrandContainer>
        <Link to="/">
          <img src={title} alt="title_icon" height="45px"/>
          <LogoImg src={mascot} alt="polar_bear" height="40px" />
        </Link>
      </DivBrandContainer>
      <Toolbar sx={navBarStyles.toolbar}>
        {user ? (
          <DivProfile>
            <Avatar sx={navBarStyles.purple} alt={user.result.name} src={user.result.imageUrl} >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography sx={navBarStyles.userName} variant="h6">{user.result.name}</Typography>
            <Button sx={navBarStyles.logout} variant="contained" color="warning" onClick={handleLogout}>Logout</Button>
          </DivProfile>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )
        }
      </Toolbar>
    </AppBar>
  );
}

export default memo(NavBar);