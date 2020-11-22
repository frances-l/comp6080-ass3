import logo from '../assets/BBLogo.jpg';
import API from './api';

const api = new API('http://localhost:5005');

export function getToken() {
  return `Bearer ${localStorage.getItem('user_token')}`;
}
export async function getQuiz(id) {
  return api.get(`admin/quiz/${id}`, { headers: { Authorization: getToken() } });
}

export async function getQuizId(sid) {
  const res = await api.get('admin/quiz', { headers: { Authorization: getToken() } });
  const retQuiz = res.quizzes.find((quiz) => {
    console.log(quiz);
    if (quiz.active) {
      return Number(quiz.active) === Number(sid);
    }
    return false;
  });
  return retQuiz.id;
}

export function fileToDataUrl(file) {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  console.log(file.type);
  const valid = validFileTypes.find((type) => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('provided file is not a png, jpg or jpeg image.');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

export function getStockImage() {
  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  console.log(logo);
  reader.readAsDataURL(logo);
  return dataUrlPromise;
}

export function getQuestion(questions, id) {
  const exists = questions.find((question) => question.id === id);
  return exists;
}

export function doesExist(list, id) {
  return list.find((node) => node.id === id);
}

export function isTimerExpired(duration, length) {
  const now = Date.now();
  const convertedTime = Date.parse(duration) + length;
  return now > convertedTime;
}

export function updateSession(attr, value, session) {
  const updatedSession = session;
  updatedSession.results.attr = value;
  return updatedSession;
}
