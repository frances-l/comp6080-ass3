// import React from 'react';
// import { useHistory } from 'react-router-dom';
// const QuestionCard = () => {
//   const handleRedirect = (qId) => {
//     history.push(`/edit/${params.gid}/${qId}`);
//   };
//   const handleDelete = (qId) => {
//     const newQuestions = questions.filter((question) => (
//       question.id !== qId
//     ));
//     setQuestions(newQuestions);
//     const updatedQuiz = quiz;
//     updatedQuiz.questions = questions;
//     setQuiz(updatedQuiz);
//   };

//   return (
//     <Grid container spacing={5}>
//       {questions.map((question) => (
//         <Grid item xs={4} key={`question-card-${question.id}`}>
//           <Card>
//             <CardMedia
//               image={handleMedia(question.media)}
//               title="question-thumbnail"
//             />
//             <CardContent>
//               <Typography variant="h5">{question.question}</Typography>
//               <Grid container direction="row">
//                 <Grid item>
//                   <Typography variant="body1">{`Points: ${question.points}`}</Typography>
//                 </Grid>
//                 <Grid item>
//                   <Typography variant="body1">{`Duration: ${question.time}`}</Typography>
//                 </Grid>
//               </Grid>
//             </CardContent>
//             <CardActions>
//               <Button onClick={handleDelete}>Delete Question</Button>
//               <Button onClick={handleRedirect(question.id)}>Edit Question</Button>
//             </CardActions>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default QuestionCard;
