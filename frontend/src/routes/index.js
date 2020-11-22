import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
// import Homepage from '../pages/Homepage';
import Dashboard from '../pages/Dashboard';
import EditQuestion from '../pages/EditQuestion';
import EditQuiz from '../pages/EditQuiz';
import PublicRoute from '../components/PublicRoute';
import PrivateRoute from '../components/PrivateRoute';
import JoinGame from '../pages/JoinGame';
import PlayPage from '../pages/PlayPage';
import Results from '../pages/Results';

const routes = [
  <PublicRoute key="route-login" restricted component={Login} path="/login" exact />,
  <PublicRoute key="route-reg" restricted component={Register} path="/register" exact />,
  // <PublicRoute restricted={false} component={Homepage} path="/" exact />,
  <PrivateRoute key="route-dash" component={Dashboard} path="/" exact />,
  // <PrivateRoute component={NewGame} path="/CreateQuiz" exact />,
  // incase you wanted to pass in some props you would do it this way
  <PrivateRoute key="route-editQues" component={EditQuestion} path="/edit/:gid/:qid" exact />,
  <PrivateRoute key="route-editQuiz" component={EditQuiz} path="/edit/:gid" exact />,
  <PrivateRoute key="route-joinWithID" component={JoinGame} path="/join/:sid" exact />,
  <PrivateRoute key="route-join" component={JoinGame} path="/join/" exact />,
  <PrivateRoute key="route-play" component={PlayPage} path="/play/:sid" exact />,
  <PrivateRoute key="route-results" component={Results} path="/session/:sid/results" exact />,
];

export default routes;
