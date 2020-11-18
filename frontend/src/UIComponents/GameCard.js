import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  CardContent, Typography, Card, CardMedia, Button, CardActions, makeStyles, Modal,
} from '@material-ui/core';
import API from '../utils/api';
import { getToken } from '../utils/helpers';

const api = new API('http://localhost:5005');
// TODO handle deleting the quiz

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    backgroundSize: 'cover',
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
}));
// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// const modalStyle = () => {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// };

// card needs just the id really
const GameCard = ({
  qId, questions, title, imgSrc, active,
}) => {
  const history = useHistory();
  const classes = useStyles();
  // const [gameActive, setGameActive] = React.useState(false);
  const [startOpen, setStartOpen] = React.useState(false);
  const [code, setCode] = React.useState(0);
  // const [endOpen, setEndOpen] = React.useState(false);
  // const [image, setImage] = React.useState(logo);
  const linkEdit = () => history.push(`/edit/${qId}`);
  console.log(active);

  const determineActive = () => {
    if (active === null) {
      return false;
    }
    return true;
  };
  // const body = (
  //   <div style={modalStyle} className={classes.paper}>
  //     <p>hello</p>
  //   </div>
  // );
  console.log(77222777, determineActive());
  // const yo = 'pooooo';
  const linkStartEnd = async () => {
    if (active === null) { // start game
      const start = await api.post(`admin/quiz/${qId}/start`, { headers: { Authorization: getToken() } });
      const res = await api.get(`admin/quiz/${qId}`, { headers: { Authorization: getToken() } });
      setCode(res.active);
      console.log(44444, res.active);
      console.log(888, res);
      console.log(222, start);
      console.log(111111, code);

      setStartOpen(true);
    } else { // end game
      console.log('hello');
    }
    // history.push('/placeholder');
  };

  const handleStartClose = () => {
    setStartOpen(false);
  };

  console.log(imgSrc);

  return (
    <Card key={qId}>
      <CardMedia className={classes.imageContainer}>
        <img src={imgSrc} className={classes.image} alt="card-thumbnail" />
      </CardMedia>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h6">{`Questions: ${questions.length}`}</Typography>
        <Typography variant="h6">{`Length: ${qId}`}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={linkEdit}>Edit Game</Button>
        <Button>Delete Game</Button>
        <Button id="start-end" onClick={linkStartEnd}>{determineActive() ? 'End Game' : 'Start Game'}</Button>
        <Modal
          open={startOpen}
          onClose={handleStartClose}
          aria-labelledby="end game"
          aria-describedby="end game modal"
        >
          <div className={classes.paper}>
            <h2>hello</h2>
            <h3>{code}</h3>
          </div>
        </Modal>
      </CardActions>
    </Card>
  );
};
GameCard.propTypes = {
  qId: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
};

export default GameCard;
