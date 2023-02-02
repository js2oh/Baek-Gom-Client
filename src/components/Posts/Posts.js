import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from '@mui/material'
import styled from "@emotion/styled";

import Post from "./Post/Post";
import makeStyles from './styles';

const postsStyles = makeStyles();

const DivLoading = styled.div(postsStyles.loading);

// Component for the collection of posts
const Posts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  // if it is not loading and post is empty, renders the text 'No posts'
  if (!posts?.length && !isLoading) return 'No posts';

  return (
    isLoading ?
      <DivLoading>
        <CircularProgress size="7em" />
      </DivLoading> :
      <Grid sx={postsStyles.container} container alignitems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Post post={post} />
          </Grid>
        ))}
      </Grid>
  );
}

export default memo(Posts);
