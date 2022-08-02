import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import styled from '@emotion/styled';
import makeStyles from './styles';
import Input from './Input';
import { googleSignin, signin, signup } from '../../actions/auth';

const authStyles = makeStyles();
const AuthForm = styled.form(authStyles.form);
const GoogleDiv = styled.div(authStyles.googleButton);

const initialAuthState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialAuthState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignup) dispatch(signup(formData, navigate));
    else dispatch(signin(formData, navigate));
  };
  const handleChange = (event) => {
    setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };
  const switchMode = () => {
    setIsSignup(prev => !prev);
    setShowPassword(false);
    setFormData(initialAuthState);
  }

  const handleCredentialResponse = (response) => {
    // Decoded GIS Token Format
    /*aud: "591385231772-e18i012p759fhmjj5d8tbkvg744seq76.apps.googleusercontent.com"
      azp: "591385231772-e18i012p759fhmjj5d8tbkvg744seq76.apps.googleusercontent.com"
      email: "taxdouble@gmail.com"
      email_verified: true
      exp: 1655522664
      family_name: "Oh"
      given_name: "Charlie"
      iat: 1655519064
      iss: "https://accounts.google.com"
      jti: "827cd4ba0b0cd2f21ee858eba7808639b1f143ad"
      name: "Charlie Oh"
      nbf: 1655518764
      picture: "https://lh3.googleusercontent.com/a-/AOh14GiWZdQ1UzmD7QJPFVPr42-X7-rljjw9x0U-0Gdcww=s96-c"
      sub: "102709268847108579742"*/ // The unique ID of the user's Google Account
    const token = response.credential;
    const { email, family_name: familyName, given_name: givenName, sub: googleId, picture: imageUrl, name } = jwt_decode(response.credential);
    const result = { email, familyName, givenName, googleId, imageUrl, name };
    try {
      dispatch(googleSignin(result, token));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '591385231772-e18i012p759fhmjj5d8tbkvg744seq76.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"), 
      { theme: "outline", size: "large", width: "364px", }
    );

    google.accounts.id.prompt();
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        google.accounts.id.renderButton(
          document.getElementById("signInDiv"), 
          { type: "icon", theme: "outline", size: "medium", }
        );
      } else {
        google.accounts.id.renderButton(
          document.getElementById("signInDiv"), 
          { theme: "outline", size: "large", width: "364px", }
        );
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })

  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={authStyles.paper} elevation={3}>
        <Avatar sx={authStyles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <AuthForm onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button sx={authStyles.submit} type="submit" fullWidth variant="contained" color="primary">{ isSignup ? "Sign Up" : "Sign In"}</Button>
          <GoogleDiv id="signInDiv"></GoogleDiv>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </AuthForm>
      </Paper>
    </Container>
  );
}

export default Auth;