import {
  Typography, Grid, CardContent, CardActions, Button, Card,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/BBLogo.jpg';
import API from '../utils/api';
import { getToken } from '../utils/helpers';
import { StoreContext } from '../utils/store';

const api = new API('http://localhost:5005');

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
    console.log(res);
  };

  return (
    <Grid container spacing={5}>
      {questions.map((question) => (
        <Grid item xs={4} key={`question-card-${question.id}`}>
          <Card>
            <img src={question.media.src && (question.media.type !== 'video') ? question.media.src : logo} alt="question Thumbnail" />
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
              <Button variant="contained" onClick={() => handleDelete()}>Delete Question</Button>
              <Button variant="contained" onClick={() => handleRedirect(question.id)}>Edit Question</Button>
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
