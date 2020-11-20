import React from 'react';
import { Typography } from '@material-ui/core';
import NavBar from '../UIComponents/NavBar';
// import isLogin from '../utils';
import API from '../utils/api';
import { getToken } from '../utils/helpers';
import GameCard from '../UIComponents/GameCard';
import logo from '../assets/BBLogo.jpg';
import '../styles/styles.css';

const api = new API('http://localhost:5005');

function Dashboard() {
  const [games, setGames] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const quizzes = await api.get('admin/quiz', {
        headers: { Authorization: getToken() },
      });
      // console.log(quizzes.quizzes);
      // using all of the id's we found from the previous api call
      // we can get all of the information we actually need
      // this should return a list of quiz meta data.
      console.log(getToken());
      // from the first fetch we get id, and the title,
      // the second we get the questions and thumbnail.
      if (quizzes.quizzes) {
        const allQuizzes = await Promise.all(quizzes.quizzes.map(async (quiz) => {
          const res = await api.get(`admin/quiz/${quiz.id}`, { headers: { Authorization: getToken() } });
          let { thumbnail } = res;
          console.log(272727, res);
          if (thumbnail === null) {
            console.log('ok');
            thumbnail = logo;
          }
          if (res.active !== null) {
            console.log(9999, 'yay');
          }
          console.log(989898, quiz);
          console.log(thumbnail);
          return {
            id: quiz.id, questions: res.questions, title: res.name, thumbnail, active: quiz.active,
          };
        }));
        console.log(allQuizzes);
        setGames(allQuizzes);
      }
    })();
  }, []);

  return (
    <main id="dashboard" className="page-layout">
      <header>
        <NavBar />
      </header>
      <section>
        <Typography variant="h3">Welcome to your dashboard!</Typography>
        {/* {Note lint doesn't fucking allow object types so we have to do this} */}
        {games.map((quiz) => (
          <GameCard
            key={`quiz-${quiz.id}`}
            gId={quiz.id}
            questions={quiz.questions}
            title={quiz.title}
            imgSrc={quiz.thumbnail}
            active={quiz.active}
          />
        ))}
      </section>
    </main>
  );
}

export default Dashboard;
