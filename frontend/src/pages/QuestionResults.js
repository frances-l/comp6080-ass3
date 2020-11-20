import { Typography, Button } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import API from '../utils/api';
import { StoreContext } from '../utils/store';
import Answer from '../components/Answer';
import { getToken } from '../utils/helpers';

const api = new API('http://localhost:5005');

// this component will interchange with the p
const QuestionResults = ({
  // question, setNextQuestion, sId, gId,
  setStage, sId,
}) => {
  // console.log(question);
  const context = React.useContext(StoreContext);
  const { player: [player] } = context;
  const { session: [session] } = context;
  const { currQuestion: [, setCurrQuestion] } = context;
  const [answers, setAnswers] = React.useState([]);
  const history = useHistory();
  // make this only visible/possible from admin
  const handleClick = async () => {
    // handle pressing next in results page
    // should advance the game, and set the question to the next one
    const results = await api.get(`admin/session/${sId}/status`, { headers: { Authorization: getToken() } });
    const nextQuestion = results.results.questions[results.results.position + 1];
    if (!nextQuestion) {
      console.log('hello');
      history.push(`/session/${sId}/results`);
    } else {
      setCurrQuestion(nextQuestion);
      setStage('preview');
    }
  };

  React.useEffect(() => {
    (async () => {
      console.log(session);
      const result = await api.get(`play/${player}/answer`, { headers: { Authorization: getToken() } });
      console.log(result);
      setAnswers(result.answerIds);
    })();
  }, [player, session]);

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
  // question: PropTypes.objectOf(PropTypes.any).isRequired,
  setStage: PropTypes.func.isRequired,
  // setNextQuestion: PropTypes.func.isRequired,
  sId: PropTypes.number.isRequired,
  // gId: PropTypes.number.isRequired,
};
export default QuestionResults;
