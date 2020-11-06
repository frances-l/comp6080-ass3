import React from 'react';
import { Popover, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const Popup = ({
  isOpen, event, id,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  console.log('POPUP');
  const handleClose = () => {
    console.log('hello');
    setAnchorEl(null);
  };
  console.log(isOpen);
  if (!isOpen && anchorEl) {
    setAnchorEl(null);
  } else if (isOpen) {
    console.log('hello');
    setAnchorEl(event.currentTarget);
  }

  return (
    <Popover
      id={id}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
    >
      <Button>helo</Button>
      <Button>he321lo</Button>
      <Button>he213lo</Button>
      <Button>hel432o</Button>
    </Popover>
  );
};

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
};

export default Popup;
