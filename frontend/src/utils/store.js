import React from 'react';
import PropTypes from 'prop-types';

export const StoreContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
export default ({ children }) => {
  const [questions, setQuestions] = React.useState([]);
  const [editQuestion, setEditQuestion] = React.useState({});
  const [quiz, setQuiz] = React.useState(0);
  const store = {
    questions: [questions, setQuestions],
    editQuestion: [editQuestion, setEditQuestion],
    quiz: [quiz, setQuiz],
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
StoreContext.propTypes = {
  children: PropTypes.node.isRequired,
};
