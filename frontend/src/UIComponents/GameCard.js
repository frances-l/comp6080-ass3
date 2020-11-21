import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  CardContent, Typography, Card, CardMedia, Button,
  CardActions, makeStyles, Modal, Input,
} from '@material-ui/core';
import API from '../utils/api';
import { getToken } from '../utils/helpers';

const api = new API('http://localhost:5005');
// TODO handle deleting the quiz

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    maxHeight: '20vh',
    maxWidth: '70vw',
    margin: '3vh 0',
    justifyContent: 'space-between',
  },
  image: {
    backgroundSize: 'cover',
    height: '20vh',
    minWidth: '20vh',
  },
  imagePicturePair: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  metadataContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20vh 30vw',
    padding: '2em',
    borderRadius: '1em',
    backgroundColor: 'grey',
  },
}));

// card needs just the id really
const GameCard = ({
  gId, questions, title, imgSrc, active,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [startOpen, setStartOpen] = React.useState(false);
  const [code, setCode] = React.useState(0);
  const [endOpen, setEndOpen] = React.useState(false);
  const [sum, setSum] = React.useState(0);
  // const [image, setImage] = React.useState(logo);
  const inputRef = React.useRef(null);
  const linkEdit = () => history.push(`/edit/${gId}`);

  React.useEffect(() => {
    if (active !== null) {
      setCode(active);
    } else {
      setCode(0);
    }
    for (let i = 0; i < questions.length; i += 1) {
      const question = questions[i];
      setSum((s) => s + Number(question.time));
    }
  }, [active, questions]);

  const linkStartEnd = async () => {
    if (code === 0) { // start game
      await api.post(`admin/quiz/${gId}/start`, { headers: { Authorization: getToken() } });
      const res = await api.get(`admin/quiz/${gId}`, { headers: { Authorization: getToken() } });
      setCode(res.active);
      console.log(111111, code);

      setStartOpen(true);
    } else { // end game
      console.log('hello');
      console.log(87878, code);
      const end = await api.post(`admin/quiz/${gId}/end`, { headers: { Authorization: getToken() } });
      console.log(end);

      setEndOpen(true);
    }
  };

  const handleStartClose = () => {
    setStartOpen(false);
  };

  const handleEndClose = () => {
    setEndOpen(false);
    setCode(0);
  };

  const viewResult = () => {
    history.push(`/session/${code}/results`);
    setCode(0);
  };

  const copy = () => {
    inputRef.current.select();
    document.execCommand('copy');
  };

  const remove = async () => {
    console.log('removing');
    const res = await api.delete(`admin/quiz/${gId}`, { headers: { Authorization: getToken() } });
    const card = document.getElementById('game-card');
    card.style.display = 'none';
    console.log(res);
  };

  console.log(imgSrc);

  return (
    <Card id="game-card" className={classes.container} key={gId}>
      <div className={classes.imagePicturePair}>
        <CardMedia className={classes.imageContainer}>
          <img src={imgSrc} className={classes.image} alt="card-thumbnail" />
        </CardMedia>
        <CardContent className={classes.metadataContainer}>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="h6">{`Questions: ${questions.length}`}</Typography>
          <Typography variant="h6">{`Game id: ${gId}`}</Typography>
          <Typography variant="h6">{`Time needed: ${sum} seconds`}</Typography>
        </CardContent>
      </div>
      <CardActions>
        <Button variant="contained" color="secondary" onClick={remove}>Delete Game</Button>
        <Button variant="contained" color="primary" onClick={linkEdit}>Edit Game</Button>
        <Button variant="contained" color="primary" id="start-end" onClick={() => linkStartEnd()}>{code ? 'End Game' : 'Start Game'}</Button>
        <Modal
          open={startOpen}
          onClose={handleStartClose}
          aria-labelledby="start game"
          aria-describedby="start game modal"
        >
          <div className={classes.paper}>
            <Typography color="textPrimary" variant="h5">Link to the started game</Typography>
            <Input inputRef={inputRef} type="text" value={`http://localhost:3000/join/${code}`} />
            <br />
            <Button variant="outlined" onClick={copy}>Copy text</Button>
          </div>
        </Modal>
        <Modal
          open={endOpen}
          onClose={handleEndClose}
          aria-labelledby="end game"
          aria-describedby="end game modal"
        >
          <div className={classes.paper}>
            <Typography color="textPrimary" variant="h5">Would you like to view the results?</Typography>
            <Button variant="outlined" onClick={() => viewResult()}>Yes</Button>
            <Button variant="outlined" onClick={() => handleEndClose()}>No</Button>
          </div>
        </Modal>
      </CardActions>
    </Card>
  );
};
GameCard.propTypes = {
  gId: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  active: PropTypes.number.isRequired,
};

export default GameCard;
