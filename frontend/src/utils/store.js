import React from 'react';
// import PropTypes from 'prop-types';

export const StoreContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
export default ({ children }) => {
  const [questions, setQuestions] = React.useState([]);
  const [quiz, setQuiz] = React.useState(0);
  const [player, setPlayer] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const [session, setSession] = React.useState({});
  const [currQuestion, setCurrQuestion] = React.useState({});
  const [edit, setEdit] = React.useState({});
  const store = {
    questions: [questions, setQuestions],
    quiz: [quiz, setQuiz],
    player: [player, setPlayer],
    answers: [answers, setAnswers],
    session: [session, setSession],
    edit: [edit, setEdit],
    currQuestion: [currQuestion, setCurrQuestion],
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

// // Component.propTypes = {
// //   children: PropTypes.element.isRequired,
// // };
// static PropTypes = {
//   children: PropTypes.element.isRequired,
// }
