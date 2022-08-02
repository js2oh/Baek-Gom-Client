import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { getPostDetails } from "../../actions/posts";

import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import styled from '@emotion/styled';

import moment from 'moment';

import makeStyles from './styles';

const postDetailsStyles = makeStyles();

const DivContainer = styled.div(postDetailsStyles.container)
const DivCard = styled.div(postDetailsStyles.card);
const DivSection = styled.div(postDetailsStyles.section);
const DivImgSection = styled.div(postDetailsStyles.imageSection);
const ImgMedia = styled.img(postDetailsStyles.media);
const DivRecommended = styled.div(postDetailsStyles.recommendedPosts);
const DivRecommendedItem = styled.div(postDetailsStyles.recommendedPost);
const ImgRecommended = styled.img(postDetailsStyles.recommendedImg);
const DivImgContainer = styled.div(postDetailsStyles.imgContainer);

const PostDetails = () => {
  const { post, recommends, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("PostDetails is Rendered")

  useEffect(() => {
    console.log("UPDATE POST DETAILS")
    dispatch(getPostDetails(id))
  }, [id, dispatch]);
  
  if (isLoading) {
    return (
      <Paper sx={postDetailsStyles.loadingPaper} elevation={6}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  if (!post) {
    return (
      <Paper sx={postDetailsStyles.mainContainer} elevation={6}>
        <Typography variant="h3" component="h2">"Unexpected Error: Post Not Found."</Typography>
      </Paper>
    );
  }

  const openPost = (_id) => {navigate(`/posts/${_id}`)};

  return (
    <Paper sx={postDetailsStyles.mainContainer} elevation={6}>
      <DivContainer>
        <DivCard>
          <DivSection>
            <Typography variant="h3" component="h2">{post?.title}</Typography>
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags.map((tag) => `#${tag} `)}</Typography>
            <Typography gutterBottom variant="body1" component="p">{post?.message}</Typography>
            <Typography variant="h6">Created by: {post?.name}</Typography>
            <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
          </DivSection>
        </DivCard>
        <DivImgSection>
          <ImgMedia src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </DivImgSection>
      </DivContainer>
      <Divider sx={postDetailsStyles.divider} />
      <Typography variant="h4" component="h3">
        Recommended Posts:
      </Typography>
      <DivRecommended>
        {recommends.map(({title, selectedFile, _id })=> (
          <DivRecommendedItem onClick={() => openPost(_id)} key={_id}>
            <DivImgContainer>
              <ImgRecommended src={selectedFile} />
            </DivImgContainer>
            <Typography gutterBottom variant="h6">{title}</Typography>
          </DivRecommendedItem>
        ))}
      </DivRecommended>
    </Paper>
  );
}

export default PostDetails