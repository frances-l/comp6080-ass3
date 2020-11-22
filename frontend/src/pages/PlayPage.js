import React from 'react';
import PropTypes from 'prop-types';
// import NavBar from '../components/NavBar';
import { StoreContext } from '../utils/store';
import StartStage from '../components/StartStage';
import QuestionResults from './QuestionResults';
import QuestionPage from './QuestionPage';
import API from '../utils/api';
import QuestionPreview from '../components/QuestionPreview';
// import { getToken } from '../utils/helpers';

const api = new API('http://localhost:5005');

const stages = {
  START: 'start',
  PREVIEW: 'preview',
  QUESTION: 'question',
  RESULT: 'results',
  END: 'end',
};
// this component will be essentially a controller between questionPage and QuestionResults.
// handle session id
// from play join
const PlayPage = (props) => {
  const [stage, setStage] = React.useState(stages.START);
  const context = React.useContext(StoreContext);
  const { player: [player] } = context;
  const { currQuestion: [, setCurrQuestion] } = context;
  const { match: { params } } = props;

  // play page is entry point for join game
  // the default value is start, so if the game hasnt started, itll automatically redirect
  // to start page.
  React.useEffect(() => {
    (async () => {
      // get the status of the quiz
      const status = await api.get(`play/${player.id}/status`);
      // if the quiz has started
      if (status.status) {
        // get the question that is currently happening and set the relevant information
        const question = await api.get(`play/${player.id}/question`);
        const questionData = question.question;
        // get total time since the question started, to see where to redirect
        let timeSinceStart = new Date(questionData.isoTimeLastQuestionStarted);
        timeSinceStart = Date.now().getTime() - timeSinceStart.getTime();
        // if the time since start is more than the question time +
        // preview, then the question is still happening
        // set the current question with the updated time so user can still answer
        // otherwise return the results
        console.log(timeSinceStart);
        if (timeSinceStart > ((questionData.preview + questionData.time) * 1000)) {
          setCurrQuestion(questionData);
          setStage(stage.RESULT);
        } else {
          questionData.time = timeSinceStart;
          setCurrQuestion(questionData);
          setStage(stage.QUESTION);
        }
      }
    })();
  }, [player.id, setCurrQuestion, stage.QUESTION, stage.RESULT]);

  const loadPage = () => {
    switch (stage) {
      case stages.PREVIEW:
        return (
          <QuestionPreview
            setStage={setStage}
          />
        );
      case stages.QUESTION:
        return (
          <QuestionPage
            setStage={setStage}
          />
        );
      case stages.RESULT:
        return (
          <QuestionResults
            setStage={setStage}
            sId={Number(params.sid)}
          />
        );
      default:
        return (
          <StartStage
            setStage={setStage}
            sessionId={Number(params.sid)}

          />
        );
    }
  };

  return (
    <main>
      {/* <NavBar /> */}
      <br />
      {loadPage()}
    </main>
  );
};

PlayPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default PlayPage;
