import React, { useState, useEffect, memo } from "react";
import Resizer from "react-image-file-resizer";

import { useSelector, useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { clearCurrentId } from '../../actions/currentId';

import { TextField, Button, Typography, Paper } from "@mui/material";
import styled from '@emotion/styled';

import { Buffer } from "buffer";

import makeStyles from './styles';
import validFileType from './isValidFile';

import { formatTags } from "../../helper/helper";

const formStyles = makeStyles();
const StyledForm = styled.form(formStyles.form);

const initialFormState = { title: "", message: "", tags: "", selectedFile: "", };
const initialHelperState = { title: "", message: "", tags: "", selectedFile: "No image currently selected", };
const errorMessage = { title: "Title must be less than 60 characters", message: "Message must be less than 600 characters", tag: "Every tag must be less than 20 characters", tags: "Cannot have more than 4 tags", selectedFile: "File is too large", };

const Form = () => {
  const post = useSelector((state) => state.currentId ? state.posts.posts.find((p) => p._id === state.currentId) : null );
  const user = useSelector((state) => state.auth.authData);
  const [postData, setPostData] = useState(initialFormState);
  const [helperData, setHelperData] = useState(initialHelperState);
  
  // const selectPostByCurrentId = createSelector(
  //   [state=>state.currentId, state=>state.posts],
  //   (currentId, posts) => (currentId) ? posts.posts.find(p=>p._id===currentId) : null
  // );
  // const post = selectPostByCurrentId(state);

  console.log("Form is Rendered")
  console.log("Form post: ", post);
  console.log("Form user: ", user);
  console.log("Form postData: ", postData);

  const dispatch = useDispatch();

  // When currentId (post) changes, set postData into either post or initial state
  useEffect(() => {
    console.log("update post from form")
    if (post) setPostData({ ...post, tags: post.tags.join(',')});
    else setPostData(initialFormState);
  }, [post]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    if (postData.title.length > 60) {
      valid = false;
      setHelperData((prev) => ({ ...prev, title: `${errorMessage.title} (${postData.title.length}/60)` }));
    } else {
      setHelperData((prev) => ({ ...prev, title: initialHelperState.title }));
    }

    if (postData.message.length > 600) {
      valid = false;
      setHelperData((prev) => ({ ...prev, message: `${errorMessage.message} (${postData.message.length}/600)`}));
    } else {
      setHelperData((prev) => ({ ...prev, message: initialHelperState.message}));
    }

    const cleanTags = formatTags(postData.tags.split(','));

    if (cleanTags.length > 4) {
      valid = false;
      setHelperData((prev) => ({ ...prev, tags: `${errorMessage.tags} (${cleanTags.length}/4)` }));
    }
    else if (cleanTags.find(tag => tag.length > 20)) {
      valid = false;
      setHelperData((prev) => ({ ...prev, tags: errorMessage.tag }));
    }
    else {
      setHelperData((prev) => ({ ...prev, tags: initialHelperState.tags }));
    }

    const resizedFileSize = Math.ceil((Buffer.from(postData.selectedFile.split(',')[1], 'base64').toString('utf8').length / 1024 / 1024)*100)/100;

    if (resizedFileSize > 1) {
      valid = false;
      setHelperData((prev) => ({ ...prev, selectedFile: `${errorMessage.selectedFile} (${resizedFileSize}/1MB)` }));
    }

    if (valid) {
      if (post) dispatch(updatePost(post._id, { ...postData, tags: cleanTags, name: user?.result?.name }));
      else dispatch(createPost({ ...postData, tags: cleanTags, name: user?.result?.name }));
      clear();
    }
  };
  
  const clear = () => {
    if (post) {
      dispatch(clearCurrentId());
    }
    setPostData(initialFormState);
    setHelperData(initialHelperState);
  };

  const fileHandler = (event) => {
    const file = (event.target.files && event.target.files?.length) ? event.target.files[0] : null;
    if (file && validFileType(file)) {
      try {
        console.log(`FileSize: ${Math.ceil((file.size/1024/1204)*100)/100} MB`);
        Resizer.imageFileResizer(
          event.target.files[0],
          480,
          480,
          "JPEG",
          80,
          0,
          (uri) => {
            console.log(`FileSize:  ${Math.ceil((Buffer.from(uri.split(',')[1], 'base64').toString('utf8').length / 1024 / 1024)*100)/100} MB`);
            setPostData({ ...postData, selectedFile: uri });
          },
          "base64",
        );
        setHelperData({ ...helperData, selectedFile: file.name });
      } catch (err) {
        console.log(err);
      }
    }
    else console.log("Error: Invalid Image");
  };

  if (!user) {
    return (
      <Paper sx={{...formStyles.root, ...formStyles.paper}} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign-in to create your own Baek GOM post and like other's posts.          
        </Typography>
      </Paper>
    )
  }
  
  return (
    <Paper sx={{...formStyles.root, ...formStyles.paper}} elevation={6}>
      <StyledForm autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">{post ? `Editing` : `Creating`} an Article</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          error={helperData.title}
          helperText={helperData.title}
          onChange={(event) => setPostData({ ...postData, title: event.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          maxRows={8}
          value={postData.message}
          error={helperData.message}
          helperText={helperData.message}
          onChange={(event) => setPostData({ ...postData, message: event.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          placeholder="e.g. ab,cd,ef => #ab#cd#ef"
          error={helperData.tags}
          helperText={helperData.tags}
          onChange={(event) => setPostData({ ...postData, tags: event.target.value })}
        />
        <Button sx={formStyles.fileInput} variant="contained" color="primary" size="small" component="label" fullWidth>
          Upload
          <input hidden type="file" onChange={fileHandler} accept="image/png, image/jpeg" />
        </Button>
        <Typography sx={formStyles.uploadText} variant="body1" noWrap>{helperData.selectedFile}</Typography>
        <Button
          sx={formStyles.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth>
          Submit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={clear}
          fullWidth>
          Clear
        </Button>
      </StyledForm>
    </Paper>
  );
}

export default memo(Form);