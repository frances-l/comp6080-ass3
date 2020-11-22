import {
  Typography, Grid, CardContent, CardActions, Button, Card, makeStyles, useTheme, useMediaQuery,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/BBLogo.jpg';
import API from '../utils/api';
import { getToken } from '../utils/helpers';
import { StoreContext } from '../utils/store';
import ErrorHandler from './ErrorHandler';

const api = new API('http://localhost:5005');

const useStyles = makeStyles((theme) => ({
  cardImage: {
    maxHeight: '35vh',
    maxWidth: '50vw',
    [theme.breakpoints.down('sm')]: {
      // minWidth: '90',
      minheight: '90vh',
    },
  },
  questionCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '50vw',
    [theme.breakpoints.down('sm')]: {
      minWidth: '90vw',
    },
  },
  buttonGroup: {
    [theme.breakpoints.down('sm')]: {
      height: '5em',
    },
  },
}));

const QuestionCard = ({ gid, questions }) => {
  const history = useHistory();
  const context = React.useContext(StoreContext);
  const { edit: [, setEdit] } = context;
  const { apiError: [, setApiError] } = context;
  const handleRedirect = (qId) => {
    setEdit(questions.find((q) => q.id === qId));
    history.push(`/edit/${gid}/${qId}`);
  };

  const handleDelete = async (qId) => {
    const newQuestions = questions.filter((question) => (
      question.id !== qId
    ));
    const res = await api.put(`admin/quiz/${gid}`, {
      headers: { 'Content-type': 'application/json', Authorization: getToken() },
      body: JSON.stringify({
        questions: newQuestions,
      }),
    });
    const elem = document.getElementById(`q-${qId}`);
    elem.style.display = 'none';
    if (res.error) {
      setApiError({ error: true, message: res.error });
    }
  };
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid container direction={matches ? 'column' : 'row'} spacing={5}>
      {questions.map((question) => (
        <Grid
          key={`question-card-${question.id}`}
          id={`q-${question.id}`}
          container
          item
          justify="center"
          xs={matches ? 12 : 4}
        >
          <Card className={classes.questionCard}>
            <Grid container item justify="center">
              <Grid item>
                <img
                  className={classes.cardImage}
                  src={question.media.src && (question.media.type !== 'video') ? question.media.src : logo}
                  alt="question Thumbnail"
                />
              </Grid>
            </Grid>
            <CardContent>
              <Typography variant="h5" align="center">{question.question}</Typography>
              <Grid container direction="row" justify="space-around">
                <Grid item>
                  <Typography variant="body1">{`Points: ${question.points}`}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{`Duration: ${question.time}`}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={6}>
                  <Button
                    className={classes.buttonGroup}
                    fullWidth
                    color="secondary"
                    variant="contained"
                    onClick={() => handleDelete(question.id)}
                    size="large"
                  >
                    Delete Question

                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    className={classes.buttonGroup}
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={() => handleRedirect(question.id)}
                    size="large"
                  >
                    Edit Question

                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <ErrorHandler />
    </Grid>
  );
};

QuestionCard.propTypes = {
  gid: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default QuestionCard;
