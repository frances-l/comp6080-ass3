import React from 'react';
// import PropTypes from 'prop-types';

export const StoreContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
export default ({ children }) => {
  const [questions, setQuestions] = React.useState([]);
  const [edit, setEdit] = React.useState({});
  const [quiz, setQuiz] = React.useState(0);
  const [session, setSession] = React.useState({});
  const [currQuestion, setCurrQuestion] = React.useState({});
  const [playerAnswers, setPlayerAnswers] = React.useState([]);
  const [player, setPlayer] = React.useState({});
  const [apiError, setApiError] = React.useState({ error: false, message: '' });
  const store = {
    questions: [questions, setQuestions],
    edit: [edit, setEdit],
    quiz: [quiz, setQuiz],
    session: [session, setSession],
    playerAnswers: [playerAnswers, setPlayerAnswers],
    player: [player, setPlayer],
    currQuestion: [currQuestion, setCurrQuestion],
    apiError: [apiError, setApiError],
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

// // Component.propTypes = {
// //   children: PropTypes.element.isRequired,
// // };
// static PropTypes = {
//   children: PropTypes.element.isRequired,
// }
