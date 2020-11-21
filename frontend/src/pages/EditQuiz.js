import {
  Typography, Grid, Button, makeStyles, Modal, Input, Divider, useTheme, useMediaQuery,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import QuestionCard from '../UIComponents/QuestionCard';
import NavBar from '../UIComponents/NavBar';
import { fileToDataUrl, getQuiz, getToken } from '../utils/helpers';
import { StoreContext } from '../utils/store';
import API from '../utils/api';

const api = new API('http://localhost:5005');

const useStyles = makeStyles((theme) => ({
  appBarSpacer: {
    height: '15vh',
  },
  pageLayout: {
    margin: '0 10vw',
  },
  paper: {
    // position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: 'auto',
  },
  editButtonGroup: {
    [theme.breakpoints.down('sm')]: {
      height: '6vh',
    },
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
  const [image, setImage] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [titleOpen, setTitleOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
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
      id: questions.length, points: 10, time: 30, qType: 'single', answers: [], preview: 5,
    });
    history.push(`/edit/${params.gid}/${questions.length}`);
  };

  const displayModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitleOpen(false);
  };

  const displayChangeTitle = () => {
    setTitleOpen(true);
  };

  const handleImage = async (event) => {
    console.log(event);
    const info = await fileToDataUrl(event.target.files[0]);
    console.log(info);
    setImage(info);

    // console.log(fileToDataUrl(file));
  };

  const submit = async () => {
    const quiz = await api.get(`admin/quiz/${params.gid}`, {
      headers: {
        Authorization: getToken(),
      },
    });
    const res = await api.put(`admin/quiz/${params.gid}`, {
      headers: { 'Content-type': 'application/json', Authorization: getToken() },
      body: JSON.stringify({
        questions: quiz.questions,
        name: quiz.name,
        thumbnail: image,
      }),
    });
    if (res.error) {
      console.log(res.error);
    }
    console.log(res);
  };

  const changeTitle = async () => {
    const quiz = await api.get(`admin/quiz/${params.gid}`, {
      headers: {
        Authorization: getToken(),
      },
    });
    const res = await api.put(`admin/quiz/${params.gid}`, {
      headers: { 'Content-type': 'application/json', Authorization: getToken() },
      body: JSON.stringify({
        questions: quiz.questions,
        name: title,
        thumbnail: quiz.thumbnail,
      }),
    });
    if (res.error) {
      console.log(res.error);
    }
    console.log(res);
    setQuizTitle(title);
    setTitleOpen(false);
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div className={classes.pageLayout}>
      <NavBar />
      <div className={classes.appBarSpacer} />
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography color="textPrimary" variant={matches ? 'h3' : 'h1'}>{quizTitle}</Typography>
        </Grid>
        <div className={classes.appBarSpacer} />
        <Grid container spacing={5}>
          <QuestionCard gid={Number(params.gid)} questions={questions} />
        </Grid>
        <Grid direction="column" container spacing={10} alignItems="center">
          <Grid item>
            {(() => {
              if (questions.length === 0) {
                return (
                  <Typography color="textPrimary" variant={matches ? 'h5' : 'h3'} align="center">
                    Heres a nice fresh
                    quiz for you! Click the button below to start adding some questions!
                  </Typography>
                );
              }
              return <Typography variant="h3"> </Typography>;
            })()}
          </Grid>
          <Divider />
          <Grid container item direction={matches ? 'column' : 'row'} justify="center" spacing={5}>
            <Grid item>
              <Button
                className={classes.editButtonGroup}
                fullWidth={matches}
                variant="contained"
                color="primary"
                onClick={() => handleNewQuestion()}
              >
                Add a new Question!
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.editButtonGroup}
                fullWidth={matches}
                variant="contained"
                color="primary"
                onClick={() => displayModal()}
              >
                Add a thumbnail

              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="upload photo"
                aria-describedby="upload photo modal"
              >
                <main className={classes.paper}>
                  <Typography variant="h5">Upload photo here!</Typography>
                  <Input type="file" onChange={(e) => handleImage(e)} />
                  <Button variant="outlined" onClick={() => submit()}>Submit thumbnail</Button>
                </main>
              </Modal>
            </Grid>
            <Grid item>
              <Button
                className={classes.editButtonGroup}
                fullWidth={matches}
                id="change-title"
                variant="contained"
                color="primary"
                onClick={() => displayChangeTitle()}
              >
                Change Quiz Title

              </Button>
              <Modal
                open={titleOpen}
                onClose={handleClose}
                aria-labelledby="change title"
                aria-describedby="change title modal"
              >
                <main className={classes.paper}>
                  <Typography variant="h5">New title for the quiz</Typography>
                  <Input id="new-title" type="text" onChange={(event) => setTitle(event.target.value)} />
                  <Button id="submit-title" variant="outlined" onClick={() => changeTitle()}>Submit new title</Button>
                </main>
              </Modal>
            </Grid>
            <Grid item>
              <Button
                className={classes.editButtonGroup}
                fullWidth={matches}
                id="confirm"
                variant="contained"
                color="primary"
                onclick={() => { history.push('/'); }}
              >
                Go back

              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

EditQuiz.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditQuiz;
