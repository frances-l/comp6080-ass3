import React from 'react';
import {
  Grid, Button, TextField, Popover, ButtonGroup,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import PropTypes from 'prop-types';
import { fileToDataUrl } from '../utils/helpers';

const media = {
  IMAGE: 'image',
  VIDEO: 'video',
  NONE: 'none',
};

const MediaZone = ({ question, setQuestion }) => {
  const [link, setLink] = React.useState('');
  // const [image, setImage] = React.useState('');
  const [mediaType, setMediaType] = React.useState(media.IMAGE);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = async (type, file) => {
    const updatedQuestion = question;
    let src;
    if (type === media.IMAGE && file.length > 0) {
      src = await fileToDataUrl(file[0]);
    } else if (type === media.VIDEO) {
      src = file;
    }

    updatedQuestion.media = { type, src };
    setQuestion(updatedQuestion);
  };
  const handleRemove = () => {
    const updatedQuestion = question;
    delete updatedQuestion.media;
    setQuestion(updatedQuestion);
    setMediaType(media.IMAGE);
  };

  const imageArea = (
    <DropzoneArea
      acceptedFiles={['image/*', 'video/*']}
      dropzoneText="Elevate your question! Click or drag and drop to upload a
  picture, audio clip, or video!"
      initialFiles={[]}
      onChange={(file) => { handleChange('image', file); }}
      filesLimit={1}
    />
  );

  const videoArea = (
    <iframe
      title="question-video"
      width="560"
      height="315"
      src={link}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyrosc
  ope; picture-in-picture"
      allowFullScreen
    />
  );
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddLink = () => {
    handleClose();
    setMediaType(media.VIDEO);
    handleChange('video', link);
  };

  const embedLink = (value) => {
    const embeddedLink = value.replace('watch?v=', 'embed/');
    setLink(embeddedLink);
  };

  const handleYoutubeLink = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Grid container item xs={12}>
      {/* {handleLoad()} */}
      {mediaType === media.IMAGE || (media.NONE && !media.VIDEO) ? imageArea : videoArea}
      <Grid container item justify="center">
        <ButtonGroup color="primary" aria-label="mediazone-button-group">
          <Button color="primary" variant="contained" onClick={() => { setMediaType(media.IMAGE); }}>Upload an Image</Button>
          <Button color="primary" variant="contained" onClick={handleYoutubeLink}>Link a YouTube Video</Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <TextField
              onChange={(event) => embedLink(event.target.value)}
              label="Insert Your link here"
            />
            <Button color="primary" variant="contained" onClick={handleClose}>Cancel</Button>
            <Button color="primary" variant="contained" onClick={handleAddLink}>Add</Button>
          </Popover>
          <Button color="primary" variant="contained" onClick={handleRemove}>Remove</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};
MediaZone.propTypes = {
  question: PropTypes.objectOf(PropTypes.any).isRequired,
  setQuestion: PropTypes.func.isRequired,
};
export default MediaZone;
