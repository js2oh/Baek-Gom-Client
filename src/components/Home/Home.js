import React, { useState, memo, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';

import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material';
import makeStyles from './styles';

import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import Pagination from '../Pagination';
import ChipInput from '../ChipInput/ChipInput';

import { formatTags } from '../../helper/helper';

const homeStyles = makeStyles();

const Home = () => {
  // extracting search parameters from the current URL
  const searchParams = new URL(window.location).searchParams;
  const page = searchParams.get('page') || 1;
  const searchQuery = searchParams.get('searchQuery');
  const searchTags = searchParams.get('tags');

  // states for the search and tag input fields
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  
  console.log("Home is Rendered");
  // console.log(`Home: ${page} ${searchQuery} ${searchTags}`);
  // console.log(`Home: ${search} ${tags}`);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if (searchQuery?.trim() || searchTags) {
      console.log("useEffect Home getPostsBySearch")
      dispatch(getPostsBySearch({ page, search: searchQuery, tags: searchTags }));
    }
    else {
      console.log("useEffect Home getPosts")
      dispatch(getPosts(page));
    }
  }, [dispatch, searchQuery, searchTags, page]);

  // key-down event handler for search input field
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchPost();
    }
  };

  const searchPost = () => {
    if (search?.trim() || tags) {
      navigate(`/posts/search?searchQuery=${search || ''}&tags=${formatTags(tags).join(',')}`);
    }
    else {
      navigate('/');
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid sx={homeStyles.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts></Posts>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar sx={homeStyles.appBarSearch} position="static" color="inherit">
              <TextField
                name="search" variant="outlined" label="Search Notes" fullWidth value={search} onChange={(event) => setSearch(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <ChipInput setTags={setTags} />
              <Button sx={homeStyles.searchButton} onClick={searchPost} color="primary" variant="contained">Search</Button>
            </AppBar>
            <Form></Form>
              <Paper elevation={6} sx={homeStyles.pagination}>
                <Pagination page={page} search={searchQuery} tags={searchTags} /> 
              </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default memo(Home);