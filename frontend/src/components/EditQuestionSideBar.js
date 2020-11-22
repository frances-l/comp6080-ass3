import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField, Grid, Button, FormControl, makeStyles,
  InputLabel, Select, MenuItem, useTheme, useMediaQuery,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { StoreContext } from '../utils/store';

const useStyles = makeStyles(() => ({
  sidebar: {
    backgroundColor: 'rgb(62,62,66)',
    padding: '1em',
    borderRadius: '0.5em',
  },
}));
const EditQuestionSideBar = ({ handleChange, handleConfirm, gId }) => {
  const context = React.useContext(StoreContext);
  const { edit: [edit] } = context;
  const history = useHistory();

  const handleCancel = () => {
    history.push(`/edit/${gId}`);
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  return (
    <Grid
      container
      item
      direction="column"
      xs={matches ? 12 : 4}
      justify="space-between"
      className={classes.sidebar}
      spacing={matches ? 3 : 0}
    >
      <Grid item>
        <FormControl fullWidth>
          <InputLabel id="question-type-label">Question Type</InputLabel>
          <Select
            displayEmpty
            labelId="question-type-label"
            id="question-type-select"
            defaultValue={edit.qType}
            onChange={(event) => handleChange('qType', event.target.value)}
          >
            <MenuItem value="single">Single Choice</MenuItem>
            <MenuItem value="multi">Multiple Choice</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          defaultValue={edit.points}
          id="points"
          onChange={(event) => handleChange('points', event.target.value)}
          label="Points?"
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          defaultValue={edit.time}
          id="timer"
          onChange={(event) => handleChange('time', Number(event.target.value))}
          label="Question Duration"
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          defaultValue={edit.preview}
          id="preview"
          onChange={(event) => handleChange('preview', Number(event.target.value))}
          label="Preview Duration"
        />
      </Grid>
      { !matches && (
      <Grid item>
        <Button
          fullWidth
          onClick={handleCancel}
          variant="contained"
          color="secondary"
        >
          Cancel

        </Button>
      </Grid>
      ) }
      { !matches && (
      <Grid item>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={handleConfirm}
        >
          Confirm Question

        </Button>
      </Grid>
      )}
    </Grid>
  );
};

EditQuestionSideBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  gId: PropTypes.string.isRequired,
};
export default EditQuestionSideBar;
