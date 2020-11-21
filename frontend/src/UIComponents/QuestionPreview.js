import {
  Typography, LinearProgress, Container, Paper, CardMedia, Card,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown';
import React from 'react';
// import { StoreContext } from '../utils/store';
import API from '../utils/api';
import { getToken } from '../utils/helpers';

const api = new API('http://localhost:5005');
const QuestionPreview = ({
  question, setStage, quizId, sId,
}) => {
  // const context = React.useContext(StoreContext);
  // const { session: [session] } = context;
  const renderer = ({ seconds }) => <LinearProgress variant="determinate" value={seconds * 20} />;

  const handleComplete = async () => {
    let res;
    res = await api.get(`admin/session/${sId}/status`, { headers: { Authorization: getToken() } });
    res = await api.post(`admin/quiz/${quizId}/advance`, { headers: { Authorization: getToken() } });
    console.log(res);
    setStage('question');
  };

  return (
    <section>
      <Container>
        <Paper>
          <Typography color="textPrimary" variant="h1">{question.question}</Typography>
        </Paper>
        <Card>
          {(() => {
            if (question.media.type === 'video') {
              return <CardMedia component="iframe" title="question-preview-video" src={question.media.src} />;
            } if (question.media.src) {
              return <img src={question.media.src} alt="question-preview" />;
            }
            return null;
          })()}
        </Card>
        <Countdown
          date={Date.now() + 5000}
          renderer={renderer}
          onComplete={() => handleComplete()}
        />
      </Container>
    </section>
  );
};

QuestionPreview.propTypes = {
  question: PropTypes.objectOf(PropTypes.any).isRequired,
  setStage: PropTypes.func.isRequired,
  quizId: PropTypes.number.isRequired,
  sId: PropTypes.number.isRequired,
};

export default QuestionPreview;
