import {
  CardMedia, Typography, Grid, CardContent, CardActions, Button, Card, makeStyles,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// import { StoreContext } from '../utils/store';
import logo from '../assets/BBLogo.jpg';
import NavBar from '../UIComponents/NavBar';
import { getQuiz } from '../utils/helpers';
// import API from '../utils/api';

// const api = new API('http://localhost:5005');

const useStyles = makeStyles(() => ({
  appBarSpacer: {
    height: '15vh',
    // backgroundColor: 'black',
  },
}));

const EditQuiz = (props) => {
  // this should contain all of the questions from the quiz we want to check out.
  const [quiz, setQuiz] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const { match: { params } } = props;
  const history = useHistory();
  const handleMedia = (file) => (file || logo);

  React.useEffect(() => {
    (async () => {
      const res = await getQuiz(params.gid);
      console.log(res);
      setQuiz(res);
      console.log('setting quiz');
      if (res.questions.length >= 1) {
        console.log('setting pre-existing');
        setQuestions(res.questions);
      }
    })();
  }, [params.gid]);

  const QuestionCard = () => {
    const handleRedirect = (qId) => {
      history.push(`/edit/${params.gid}/${qId}`);
    };
    const handleDelete = (qId) => {
      const newQuestions = questions.filter((question) => (
        question.id !== qId
      ));
      setQuestions(newQuestions);
      const updatedQuiz = quiz;
      updatedQuiz.questions = questions;
      setQuiz(updatedQuiz);
    };

    return (
      <Grid container spacing={5}>
        {questions.map((question) => (
          <Grid item xs={4} key={`question-card-${question.id}`}>
            <Card>
              <CardMedia
                image={handleMedia(question.media)}
                title="question-thumbnail"
              />
              <CardContent>
                <Typography variant="h5">{question.question}</Typography>
                <Grid container direction="row">
                  <Grid item>
                    <Typography variant="body1">{`Points: ${question.points}`}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">{`Duration: ${question.time}`}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button onClick={handleDelete}>Delete Question</Button>
                <Button onClick={handleRedirect(question.id)}>Edit Question</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  const classes = useStyles();

  const handleNewQuestion = () => {
    console.log(questions.length);
    history.push(`${params.gid}/${questions.length}`);
  };

  return (
    <div>
      <NavBar />
      <div className={classes.appBarSpacer} />
      <Typography variant="h1">Title placeholder</Typography>
      <div className={classes.appBarSpacer} />
      <Grid container spacing={5}>
        <QuestionCard />
      </Grid>
      <Grid direction="column" container>
        {(() => {
          if (questions.length === 0) {
            return <Typography variant="h3">Heres a nice fresh quiz for you! Click the button below to start adding some questions!</Typography>;
          }
          return <div />;
        })()}
        <Button
          variant="contained"
          onClick={handleNewQuestion}
        >
          Add a new Question!

        </Button>
      </Grid>
    </div>
  );
};

EditQuiz.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditQuiz;
