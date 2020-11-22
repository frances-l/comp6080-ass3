import React from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer } from '@material-ui/core';
import EditQuestionSideBar from './EditQuestionSideBar';

const EditQuestionBarDrawer = ({ handleChange, handleConfirm, gId }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button fullWidth color="primary" size="large" variant="contained" onClick={() => setOpen(true)}>More Options</Button>
      <Drawer anchor="top" open={open} onClose={() => setOpen(false)}>
        <EditQuestionSideBar
          handleChange={handleChange}
          handleConfirm={handleConfirm}
          gId={gId}
        />
      </Drawer>
    </div>
  );
};
EditQuestionBarDrawer.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  gId: PropTypes.number.isRequired,
};
export default EditQuestionBarDrawer;
