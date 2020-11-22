/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  const withCorr = JSON.parse(JSON.stringify(question));
  withCorr.answers.forEach((elem) => {
    delete elem.correct;
  });
  console.log(222, withCorr);
  return withCorr;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  const correctAnswers = question.answers.filter((a) => a.correct).map((a) => a.id);
  return correctAnswers; // For a single answer
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  return [
    123,
    456,
    678,
  ]; // For a single answer
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return Number(question.time) + Number(question.preview);
};
