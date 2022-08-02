import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Container } from '@mui/material';

import NavBar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

import { clearCurrentId } from "./actions/currentId";

function App() {
  const user = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();

  console.log("App is Rendered");
  console.log("App user: ", user);

  useEffect(()=> {
    console.log("update app")
    dispatch(clearCurrentId());
  })

  return (
    <BrowserRouter>
      <Container maxWidth="xl" sx={{minWidth: '350px',}}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={user ? <Navigate to="/" replace /> : <Auth />} />    
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
