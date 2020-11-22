import {
  Typography, Grid, Paper, CardMedia,
  makeStyles, useTheme, useMediaQuery,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { StoreContext } from '../utils/store';
import NavBar from '../components/NavBar';
import AppBarSpacer from '../utils/styles';
import LinearTimer from '../components/LinearTimer';

const useStyles = makeStyles((theme) => ({
  questionContainer: {
    padding: '1em 3em',
    borderRadius: '1em',
  },
  pageLayout: {
    padding: '0 5em',
    [theme.breakpoints.down('sm')]: {
      padding: '0 1em',
    },
  },
}));
const QuestionPreview = ({ setStage }) => {
  const context = React.useContext(StoreContext);
  const { currQuestion: [currQuestion] } = context;

  const handleComplete = async () => {
    setStage('question');
  };

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <AppBarSpacer />
      <section className={classes.pageLayout}>
        <Grid container direction="column" spacing={3} alignContent="center" justify="center">
          <Grid item>
            <Paper className={classes.questionContainer}>
              <Typography color="textPrimary" variant={matches ? 'h3' : 'h1'}>{currQuestion.question}</Typography>
            </Paper>
          </Grid>
          <Grid container item alignItems="center" justify="center">
            <Grid item>
              {(() => {
                if (currQuestion.media.type === 'video') {
                  return <CardMedia component="iframe" title="question-preview-video" src={currQuestion.media.src} />;
                } if (currQuestion.media.src) {
                  return <img src={currQuestion.media.src} alt="question-preview" />;
                }
                return null;
              })()}
            </Grid>
          </Grid>
          <Grid item>
            <LinearTimer handleComplete={handleComplete} time={currQuestion.preview} />
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

QuestionPreview.propTypes = {
  setStage: PropTypes.func.isRequired,
};

export default QuestionPreview;
