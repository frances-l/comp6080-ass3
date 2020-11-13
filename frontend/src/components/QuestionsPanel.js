// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   TabPanel, TextField, Grid,
// } from '@material-ui/core';
// import { DropzoneArea } from 'material-ui-dropzone';

// const QuestionsPanel = ({
//   label, question, value, setQuestions,
// }) => {
//   const [currQuestion, setCurrQuestion] = React.useState(question.question);
//   const [answers, setAnswers] = React.useState(question.answers);
//   const [timer, setTimer] = React.useState(question.timer);
//   const [points, setPoints] = React.useState(question.points);
//   const [media, setMedia] = React.useState(question.media);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if(currQuestion && answers && timer && points) {
//       const question = {}
//     }

//   }

//   return (
//     <section>
//       <TabPanel label={label} value={value}>
//         <form onSubmit={(event) => handleSubmit(event)}
//         <Grid container>
//           <TextField
//             label="Enter your Question"
//             defaultValue={question.question}
//             onBlur={(event) => setCurrQuestion(event.target.value)}
//           />
//           <Grid item xs={9}>
//             {/* Change this so that if theres already an image */}
//             <DropzoneArea
//               acceptedFiles={['image/*']}
//               dropzoneText="Want a cool
//                     cover photo? Click to upload or Drag and drop one here!"
//               onChange={(input) => { setMedia(input); }}
//               filesLimit={1}
//             />
//           </Grid>
//           <Grid item role="region" xs={3}>
//             <TextField id="time" label="Duration"
// onChange={(event) => { setTimer(event.target.value); }} />
//             <TextField id="points" label="Points"
// onChange={(event) => { setPoints(event.target.value); }} />
//           </Grid>
//           <Grid item>
//             <TextField id="option-1" onBlur={(event) => { setAnswers(event); }} />
//             <TextField id="option-2" onBlur={(event) => { setAnswers(event); }} />
//             <TextField id="option-3" onBlur={(event) => { setAnswers(event); }} />
//             <TextField id="option-4" onBlur={(event) => { setAnswers(event); }} />
//           </Grid>
//         </Grid>
//       </TabPanel>
//     </section>
//   );
// };

// QuestionsPanel.propTypes = {
//   label: PropTypes.string.isRequired,
//   question: PropTypes.objectOf(PropTypes.object),
//   value: PropTypes.number.isRequired,
//   setQuestions: PropTypes.func.isRequired,
// };
// QuestionsPanel.defaultProps = {
//   question: {},
// };
// export default QuestionsPanel;
