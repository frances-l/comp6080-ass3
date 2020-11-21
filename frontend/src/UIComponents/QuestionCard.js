import {
  Typography, Grid, CardContent, CardActions, Button, Card, makeStyles,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/BBLogo.jpg';
import API from '../utils/api';
import { getToken } from '../utils/helpers';
import { StoreContext } from '../utils/store';

const api = new API('http://localhost:5005');

const useStyles = makeStyles(() => ({
  cardImage: {
    maxHeight: '42vh',
    maxWidth: '40vw',
  },
  questionCard: {
    minWidth: '40vw',
  },
}));

const QuestionCard = ({ gid, questions }) => {
  // const handleMedia = (src) => {
  //   if (src === '') {
  //     return logo;
  //   }
  //   return src;
  // };
  const history = useHistory();
  const context = React.useContext(StoreContext);
  const { edit: [, setEdit] } = context;

  const handleRedirect = (qId) => {
    console.log(questions.find((q) => q.id === qId));
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

    console.log(res);
  };
  const classes = useStyles();
  return (
    <Grid container spacing={5}>
      {questions.map((question) => (
        <Grid item xs={3} key={`question-card-${question.id}`} id={`q-${question.id}`}>
          <Card className={classes.questionCard}>
            <Grid item>
              <img
                className={classes.cardImage}
                src={question.media.src && (question.media.type !== 'video') ? question.media.src : logo}
                alt="question Thumbnail"

              />
            </Grid>
            <CardContent>
              <Typography variant="h5" align="center">{question.question}</Typography>
              <Grid container direction="row" spacing={10}>
                <Grid item>
                  <Typography variant="body1">{`Points: ${question.points}`}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{`Duration: ${question.time}`}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container item direction="row" justify="space-around">
                <Grid item>
                  <Button color="primary" variant="contained" onClick={() => handleDelete(question.id)}>Delete Question</Button>
                </Grid>
                <Grid item>
                  <Button color="primary" variant="contained" onClick={() => handleRedirect(question.id)}>Edit Question</Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

QuestionCard.propTypes = {
  gid: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default QuestionCard;
