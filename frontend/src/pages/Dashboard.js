import React from 'react';
import { Grid } from '@material-ui/core';
import NavBar from '../components/NavBar';
// import isLogin from '../utils';
import API from '../utils/api';
import { getToken } from '../utils/helpers';
import GameCard from '../components/GameCard';
import logo from '../assets/BBLogo.jpg';
import '../styles/styles.css';
import AppBarSpacer from '../utils/styles';
import ErrorHandler from '../components/ErrorHandler';
import { StoreContext } from '../utils/store';

const api = new API('http://localhost:5005');

function Dashboard() {
  const [games, setGames] = React.useState([]);
  const context = React.useContext(StoreContext);
  const { apiError: [, setApiError] } = context;
  React.useEffect(() => {
    (async () => {
      const quizzes = await api.get('admin/quiz', {
        headers: { Authorization: getToken() },
      });
      // using all of the id's we found from the previous api call
      // we can get all of the information we actually need
      // this should return a list of quiz meta data.
      // from the first fetch we get id, and the title,
      // the second we get the questions and thumbnail.
      if (quizzes.quizzes) {
        const allQuizzes = await Promise.all(quizzes.quizzes.map(async (quiz) => {
          const res = await api.get(`admin/quiz/${quiz.id}`, { headers: { Authorization: getToken() } });
          if (res.error) {
            setApiError({ error: true, message: res.error });
          }
          let { thumbnail } = res;
          if (thumbnail === null) {
            thumbnail = logo;
          }
          return {
            id: quiz.id, questions: res.questions, title: res.name, thumbnail, active: quiz.active,
          };
        }));
        setGames(allQuizzes);
      }
    })();
  }, [setApiError]);

  return (
    <main id="dashboard" className="page-layout">
      <header>
        <NavBar />
      </header>
      <AppBarSpacer />
      <div />
      <section>
        {/* {Note lint doesn't fucking allow object types so we have to do this} */}
        <Grid container alignItems="center" justify="center" spacing={3}>
          {games.map((quiz) => (
            <Grid item>
              <GameCard
                key={`quiz-${quiz.id}`}
                gId={quiz.id}
                questions={quiz.questions}
                title={quiz.title}
                imgSrc={quiz.thumbnail}
                active={quiz.active}
              />
            </Grid>
          ))}
        </Grid>
        <ErrorHandler />
      </section>
    </main>
  );
}

export default Dashboard;
