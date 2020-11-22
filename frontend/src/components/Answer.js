import React from 'react';
import {
  Grid, CardActionArea, Typography, makeStyles, useTheme, useMediaQuery,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { StoreContext } from '../utils/store';

const useStyles = makeStyles((theme) => ({
  selectedAnswer: {
    backgroundColor: 'rgb(186,225,255)',
    borderRadius: '1em',
    color: 'black',
    height: '20vh',
    [theme.breakpoints.down('sm')]: {
      height: '10vh',
    },
  },
  nonSelectedAnswer: {
    backgroundColor: 'rgb(61,61,61)',
    borderRadius: '1em',
    height: '20vh',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      height: '10vh',
    },
  },
  correctAnswer: {
    backgroundColor: 'rgb(37, 208, 32)',
    borderRadius: '1em',
    height: '20vh',
    color: 'black',
    [theme.breakpoints.down('sm')]: {
      height: '10vh',
    },
  },
  incorrectAnswer: {
    backgroundColor: '#ff0033',
    borderRadius: '1em',
    height: '20vh',
    [theme.breakpoints.down('sm')]: {
      height: '10vh',
    },
  },
}));

const Answer = ({
  id, text, className,
}) => {
  const context = React.useContext(StoreContext);
  const { currQuestion: [currQuestion] } = context;
  const { playerAnswers: [playerAnswers, setPlayerAnswers] } = context;
  const [selected, setSelected] = React.useState(false);
  const classes = useStyles();

  const handleMultipleAnswer = () => {
    // if the answer was previously selected then remove it from player Answers
    if (className.includes('correct') || className.includes('neutral')) return;
    let updatedAnswers;
    if (selected) {
      updatedAnswers = playerAnswers.filter((a) => a.id !== id);
    } else {
      updatedAnswers = [...playerAnswers, id];
    }
    setPlayerAnswers(updatedAnswers);
    setSelected(!selected);
  };

  const handleSingleAnswer = () => {
    if (className.includes('correct') || className.includes('neutral')) return;

    let updatedAnswers;
    // if its not selected, then we can highlight
    console.log(playerAnswers);
    if (!playerAnswers) {
      updatedAnswers = [id];
    } else if (playerAnswers[0] === id) {
      updatedAnswers = [];
    } else {
      updatedAnswers = [id];
    }
    setPlayerAnswers(updatedAnswers);
    setSelected(!selected);
  };

  React.useEffect(() => {
    if (currQuestion.qType === 'single' && playerAnswers) {
      if (playerAnswers[0] !== id) {
        setSelected(false);
      }
    }
  }, [currQuestion.qType, id, playerAnswers]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClass = () => {
    if (className === 'incorrectAnswer') {
      return classes.incorrectAnswer;
    } if (className === 'correctAnswer') {
      return classes.correctAnswer;
    } if (selected) {
      return classes.selectedAnswer;
    }
    return classes.nonSelectedAnswer;
  };
  return (
    <Grid container item xs={6}>
      <CardActionArea onClick={currQuestion.qType === 'single'
        ? () => handleSingleAnswer()
        : () => handleMultipleAnswer()}
      >
        <Grid
          className={handleClass()}
          container
          item
          direction="row"
          justify="center"
          alignContent="center"
        >
          <Grid item>
            <Typography
              variant={matches ? 'h6' : 'h5'}
              color="inherit"
            >
              {text}
            </Typography>
          </Grid>
          <Grid item />
          {className === 'correctAnswer' && <CheckBoxOutlinedIcon fontSize="large" />}
          {className === 'incorrectAnswer' && <CancelPresentationIcon fontSize="large" />}
        </Grid>
      </CardActionArea>
    </Grid>
  );
};
Answer.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Answer;
