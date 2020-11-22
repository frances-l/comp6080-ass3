import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Typography, Card, CardMedia, Button,
  CardActions, makeStyles, Modal, Input, useTheme, useMediaQuery,
} from '@material-ui/core';
import API from '../utils/api';
import { getToken } from '../utils/helpers';

const api = new API('http://localhost:5005');
// TODO handle deleting the quiz

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    maxHeight: '30vh',
    maxWidth: '70vw',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      maxHeight: '70vh',
      minWidth: '80vw',
    },
  },
  image: {
    backgroundSize: 'cover',
    height: '30vh',
    minWidth: '20vh',
    [theme.breakpoints.down('sm')]: {
      minWidth: '80',
    },
  },
  imageContainer: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  buttonDataPair: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  metadataContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: '3em',
  },
  modalPopup: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20vh 30vw',
    padding: '2em',
    borderRadius: '1em',
    backgroundColor: 'grey',
    [theme.breakpoints.down('sm')]: {
      margin: '20vh 5vw',
    },
  },
  cardRHS: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: '2vw',
  },
  cardContent: {
    display: 'flex',
    flexDirect: 'row',
  },
  buttonGroup: {

    height: '5em',

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

      setStartOpen(true);
    } else { // end game
      await api.post(`admin/quiz/${gId}/end`, { headers: { Authorization: getToken() } });
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
    await api.delete(`admin/quiz/${gId}`, { headers: { Authorization: getToken() } });
    const card = document.getElementById('game-card');
    card.style.display = 'none';
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card id="game-card" className={classes.container} key={gId}>
      <CardMedia className={classes.imageContainer}>
        <img src={imgSrc} className={classes.image} alt="card-thumbnail" />
      </CardMedia>
      <div className={classes.cardRHS}>
        <div>
          <Typography variant={matches ? 'h5' : 'h3'}>{title}</Typography>
        </div>
        <div className={classes.buttonDataPair}>
          <div className={classes.metadataContainer}>
            <Typography variant="h6">{`Questions: ${questions.length}`}</Typography>
            <Typography variant="h6">{`Game id: ${gId}`}</Typography>
            <Typography variant="h6">{`Time needed: ${sum} seconds`}</Typography>
          </div>
          <CardActions>
            <Button
              className={classes.buttonGroup}
              variant="contained"
              color="secondary"
              onClick={remove}
            >
              Delete Game

            </Button>
            <Button
              className={classes.buttonGroup}
              variant="contained"
              color="primary"
              onClick={linkEdit}
            >
              Edit Game

            </Button>
            <Button
              className={classes.buttonGroup}
              variant="contained"
              color="primary"
              id="start-end"
              onClick={() => linkStartEnd()}
            >
              {code ? 'End Game' : 'Start Game'}

            </Button>
            <Modal
              open={startOpen}
              onClose={handleStartClose}
              aria-labelledby="start game"
              aria-describedby="start game modal"
              id="link-modal"
            >
              <div className={classes.modalPopup}>
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
              <div className={classes.modalPopup}>
                <Typography color="textPrimary" variant="h5">Would you like to view the results?</Typography>
                <Button id="yes" variant="outlined" onClick={() => viewResult()}>Yes</Button>
                <Button id="no" variant="outlined" onClick={() => handleEndClose()}>No</Button>
              </div>
            </Modal>
          </CardActions>
        </div>
      </div>
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
