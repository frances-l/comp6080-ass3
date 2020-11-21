/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  console.log('See question: ', question);
  const parsedAnswers = question.answers.map((a) => {
    const answerNoCorrect = a;
    delete answerNoCorrect.correct;
    return answerNoCorrect;
  });
  const retQuestion = {
    id: question.id,
    question: question.question,
    answers: parsedAnswers,
    time: question.time,
    media: question.media,
    preview: question.preview,
    qType: question.qType,
  };
  return retQuestion;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  const correctAnswers = question.answers.filter((a) => a.correct).map((a) => a.id);
  console.log(correctAnswers);
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
