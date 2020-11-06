import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  CardContent, Typography, Card, CardActionArea, CardMedia, Button, CardActions,
} from '@material-ui/core';
// card needs just the id really
const GameCard = ({
  qId, questions, title, imgSrc,
}) => {
  const history = useHistory();

  const linkEdit = () => history.push('/placeholder');
  const linkStart = () => history.push('/placeholder');

  return (
    <Card>
      <CardActionArea>
        <CardMedia image={imgSrc} />
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h6">{`Questions: ${questions.length}`}</Typography>
          <Typography variant="h6">{`Length: ${qId}`}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={linkEdit}>Edit Game</Button>
          <Button onClick={linkStart}>Start Game</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
GameCard.propTypes = {
  qId: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default GameCard;
