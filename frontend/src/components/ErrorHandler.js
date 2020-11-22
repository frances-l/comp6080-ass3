import React from 'react';

import {
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { StoreContext } from '../utils/store';

const ErrorHandler = () => {
  const context = React.useContext(StoreContext);
  const { apiError: [apiError, setApiError] } = context;
  // const [open, setOpen] = React.useEffect(apiError);

  const handleClose = () => {
    setApiError(false, ' ');
  };

  return (
    <Snackbar open={apiError.error} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
        {apiError.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default ErrorHandler;
