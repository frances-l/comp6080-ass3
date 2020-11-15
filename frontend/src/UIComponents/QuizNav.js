import React from 'react';
import {
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StoreContext } from '../utils/store';

const QuizNav = ({ quizId, questionId }) => {
  const history = useHistory();
  // const { quiz } = React.useContext(StoreContext);
  const { editQuestion } = React.useContext(StoreContext);
  const { questions } = React.useContext(StoreContext);
  const [quizQuestions, setQuizQuestions] = questions;
  // const [newQuestions, setNewQuestions] = React.useState(quizQuestions);

  // const qId = quiz[0];
  const [edit, setEditQuestion] = editQuestion;

  // console.log(questions);

  const handleClick = (id) => {
    const nextQuestion = quizQuestions[id];
    console.log(nextQuestion);
    console.log(edit);
    setEditQuestion(nextQuestion);
    console.log(edit);
    history.push(`/edit/${quizId}/${id}`);
  };
  // handle empty or non empty
  const handleAddQuestionClick = () => {
    // if we're trying to find an existing question
    console.log(quizQuestions);
    const updatedQuestions = quizQuestions.map((question) => {
      if (question.id === questionId) {
        return edit;
      }
      console.log(question);
      return question;
    });
    if (updatedQuestions.length === quizQuestions.length) {
      const questionPlaceholder = {
        id: quizQuestions.length, question: '', qType: 'single', answers: [], points: 0, media: '',
      };
      updatedQuestions.push(questionPlaceholder);
    }
    console.log(updatedQuestions);
    // setNewQuestions(updatedQuestions);
    setQuizQuestions(updatedQuestions);
  };

  return (
    <aside>
      {quizQuestions.map((currQuestion, i) => (
        <Button key={`question-id-${currQuestion.id}`} color="inherit" variant="outlined" onClick={() => handleClick(i)}>
          {`Question ${i + 1}`}
        </Button>
      ))}
      <Button color="inherit" fullWidth variant="outlined" onClick={handleAddQuestionClick}>Add Question</Button>
    </aside>
  );
};

QuizNav.propTypes = {
  quizId: PropTypes.number.isRequired,
  questionId: PropTypes.number.isRequired,
};

export default QuizNav;
