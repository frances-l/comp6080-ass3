import {
  Typography, Grid, Button, makeStyles, Paper,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import QuestionCard from '../UIComponents/QuestionCard';
import NavBar from '../UIComponents/NavBar';
import { getQuiz } from '../utils/helpers';
import { StoreContext } from '../utils/store';
// import API from '../utils/api';

// const api = new API('http://localhost:5005');

const useStyles = makeStyles(() => ({
  appBarSpacer: {
    height: '15vh',
  },
  pageLayout: {
    margin: '0 10vw',
  },
}));

const EditQuiz = (props) => {
  // this should contain all of the questions from the quiz we want to check out.
  // const [quiz, setQuiz] = React.useState({});
  const [questions, setQuestions] = React.useState([]);
  const [quizTitle, setQuizTitle] = React.useState([]);
  const { match: { params } } = props;
  const history = useHistory();
  const context = React.useContext(StoreContext);
  const { edit: [, setEdit] } = context;

  React.useEffect(() => {
    (async () => {
      const res = await getQuiz(params.gid);
      console.log(res);
      setQuizTitle(res.name);
      console.log('setting quiz');
      if (res.questions.length >= 1) {
        console.log('setting pre-existing');
        setQuestions(res.questions);
      }
    })();
    console.log('useeffect');
  }, [params.gid]);

  const classes = useStyles();

  const handleNewQuestion = () => {
    console.log(questions.length);
    console.log('handleNewQuestion');
    setEdit({
      id: 0, points: 10, timer: 30, qType: 'single', answers: [],
    });
    history.push(`/edit/${params.gid}/${questions.length}`);
  };

  return (
    <div className={classes.pageLayout}>
      <NavBar />
      <div className={classes.appBarSpacer} />
      <Paper>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography color="textPrimary" variant="h1">{quizTitle}</Typography>
          </Grid>
        </Grid>
        <div className={classes.appBarSpacer} />
        <Grid container spacing={5}>
          <QuestionCard gid={Number(params.gid)} questions={questions} />
        </Grid>
        <Grid direction="column" container spacing={3} alignItems="center">
          <Grid item>
            {(() => {
              if (questions.length === 0) {
                return (
                  <Typography color="textPrimary" variant="h3" align="center">
                    Heres a nice fresh
                    quiz for you! Click the button below to start adding some questions!
                  </Typography>
                );
              }
              return <Typography variant="h3">hello</Typography>;
            })()}
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleNewQuestion()}
            >
              Add a new Question!
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

EditQuiz.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditQuiz;
