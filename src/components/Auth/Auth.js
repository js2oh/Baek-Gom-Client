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

// Component for user authentication page
const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialAuthState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handler for submitting the form data and dispatch either sign-up/sign-in action
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignup) dispatch(signup(formData, navigate));
    else dispatch(signin(formData, navigate));
  };

  // Handler for controlled input and updating the form data
  const handleChange = (event) => {
    setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // Handler for showing/hiding password
  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  // Handler for switching between sign-in and sign-up UI
  const switchMode = () => {
    setIsSignup(prev => !prev);
    setShowPassword(false);
    setFormData(initialAuthState);
  }

  // Callback function to handle sign-in procedure using the returned user credentials
  const handleCredentialResponse = (response) => {
    // Google Identiry Service (GIS) Token
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

  // Set-up Google One Tap Prompt
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

  // Resizing the Google Sign-in button using the resize event (WIP)
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
