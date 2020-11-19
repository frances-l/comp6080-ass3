import { Typography, Button } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import API from '../utils/api';
import { StoreContext } from '../utils/store';
import Answer from '../components/Answer';

const api = new API('http://localhost:5005');

// this component will interchange with the p
const QuestionResults = ({
  question, setStage, setNextQuestion, sId, gId,
}) => {
  console.log(question);
  const context = React.useContext(StoreContext);
  const { player: [player] } = context;
  const { session: [, setSession] } = context;
  const [answers, setAnswers] = React.useState([]);
  // make this only visible/possible from admin
  const handleClick = async () => {
    // handle pressing next in results page
    // should advance the game, and set the question to the next one
    const res = await api.post(`admin/quiz/${gId}/advance`);
    if (!res.error) {
      const newSession = api.get(`admin/quiz/${sId}/status`);
      console.log(newSession);
      if (newSession.questions[newSession.position]) {
        setNextQuestion(newSession.questions[newSession.position]);
      } else {
        // display final results!
      }

      setSession(newSession);
    }
    setStage('preview');
  };

  React.useEffect(() => {
    (async () => {
      const result = await api.get(`play/${player}/answer`);
      console.log(result);
      const correctAnswers = question.answers.filter((a) => result.answerIds.includes(a.id));
      setAnswers(correctAnswers);
    })();
  }, [player, question.answers]);

  return (
    <div>
      <Typography variant="h1">How did you do?</Typography>
      <Typography variant="h5">The correct Answer(s) are..</Typography>
      {answers.map((a) => (
        <Answer
          id={a.id}
          text={a.answer}
          answers={[]}
          setAnswers={setAnswers}
          className={`answer-${a.id}`}
        />
      ))}
      <Button onClick={() => { handleClick(); }}>Next Question</Button>
    </div>
  );
};

QuestionResults.propTypes = {
  question: PropTypes.objectOf(PropTypes.any).isRequired,
  setStage: PropTypes.func.isRequired,
  setNextQuestion: PropTypes.func.isRequired,
  sId: PropTypes.number.isRequired,
  gId: PropTypes.number.isRequired,
};
export default QuestionResults;
