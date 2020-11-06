import React from 'react';
import { Typography } from '@material-ui/core';
import NavBar from '../UIComponents/NavBar';
// import isLogin from '../utils';
import API from '../utils/api';
import getToken from '../utils/helpers';
import GameCard from '../UIComponents/GameCard';

const api = new API('http://localhost:5005');

const getQuizzes = async () => {
  // The quizzes in the response don't contain all of the information we need
  const quizzes = await api.get('/admin/quiz', {
    header: getToken(),
  });

  // using all of the id's we found from the previous api call
  // we can get all of the information we actually need
  // this should return a list of quiz meta data.
  return Promise.all(quizzes.map(async (quiz) => {
    await api.get(`/admin/quiz/${quiz.id}`, { header: getToken() });
  }));
};

function Dashboard() {
  const [games, setGames] = React.useState([]);
  const allQuizzes = getQuizzes();
  console.log(allQuizzes);
  setGames(allQuizzes);

  return (
    <main>
      <header>
        <NavBar />
      </header>
      <section>
        <Typography variant="h3">Welcome to your dashboard!</Typography>
        {/* {Note lint doesn't fucking allow object types so we have to do this} */}
        {games.map((quiz) => (
          <GameCard
            questions={quiz.questions}
            title={quiz.name}
            imgSrc={quiz.thumbnail}
          />
        ))}
      </section>
    </main>
  );
}

export default Dashboard;
