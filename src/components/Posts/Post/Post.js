import React, { memo } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentId } from '../../../actions/currentId';

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import styled from '@emotion/styled';

import makeStyles from './styles';
import { deletePost, likePost } from "../../../actions/posts";

const postStyles = makeStyles();
const DivImg = styled.div(postStyles.postImage);
const DivCreator = styled.div(postStyles.overlay);
const DivMore = styled.div(postStyles.overlay2);
const DivTags = styled.div(postStyles.details);
const DivPostDetails = styled.div(postStyles.cardAction);

const Post = ({ post }) => {
  const user = useSelector((state) => state.auth.authData);

  console.log("Post is Rendered");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (event) => {
    event.stopPropagation();
    dispatch(setCurrentId(post._id));
  }

  const handleDelete = (event) => {
    dispatch(deletePost(post._id));
  }

  const handleLike = (event) => {
    dispatch(likePost(post._id));
  }

  const Likes = () => {
    const likeCount = post.likes.length;
    if (likeCount > 0) {
      return post.likes.find((like) => like === user?.result?.googleId || user?.result?._id)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</>
        ) : (
          <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</>
        );
    }
    return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
  }

  const openPost = () => {navigate(`/posts/${post._id}`)};

  return (
    <Card sx={postStyles.card} raised elevation={6}>
      <DivPostDetails onClick={openPost}>
        <DivImg onClick={openPost}>
          <CardMedia sx={postStyles.media} image={post.selectedFile} title={post.title}/>
          <DivCreator>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          </DivCreator>
          {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
            <DivMore>
              <Button sx={{color: 'white'}} size="small" onClick={handleEdit}>
                <MoreHorizIcon fontSize="small"/>
              </Button>
            </DivMore>
          )}
        </DivImg>
        <DivTags>
          <Typography variant="body2" color="textSecondary">{post.tags?.map((tag)=>`#${tag}`)}
          </Typography>
        </DivTags>
        <Typography sx={postStyles.title} variant="h5" gutterBottom noWrap>{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" noWrap>{post.message}</Typography>
        </CardContent>
      </DivPostDetails>
      <CardActions sx={postStyles.cardActions}>
        <Button disabled={!user?.result} size="small" color="primary" onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
          <Button size="small" color="primary" onClick={handleDelete}>
            <DeleteIcon fontSize="small"/>
            &nbsp; Delete
          </Button>
        )
        }
      </CardActions>
    </Card>
  );
}

export default memo(Post);