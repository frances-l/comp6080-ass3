// import {
//   Tabs, Tab, Typography, TabPanel, Button,
// } from '@material-ui/core';
// import React from 'react';
// import PropTypes from 'prop-types';
// import QuestionsPanel from '../components/QuestionsPanel';

// const QuestionsTab = ({ questions, setQuestions }) => {
//   // const [questions] = React.useState(prevQuestions);
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleNewQuestion = () => {
//     const newQuestions = questions;
//     setQuestions(newQuestions.push({}));
//   };

//   return (
//     <aside>
//       <Tabs
//         orientation="vertical"
//         variant="scrollable"
//         value={value}
//         onChange={handleChange}
//       >
//         <Tab label="Title Page" />
//         {questions.map((question, i) => (
//           <Tab label={`Question ${i + 1}`} />
//         ))}
//         <Button onClick={handleNewQuestion}>Add Question</Button>
//       </Tabs>
//       <TabPanel value={value} index={0}>
//         <Typography variant="h1">Give your quiz a title!</Typography>
//       </TabPanel>
//       {questions.map((question, i) => (
//         <QuestionsPanel label={`Question ${i + 1}`}
// question={question} value={value} setQuestions={setQuestions} />
//       ))}
//     </aside>
//   );
// };

// QuestionsTab.propTypes = {
//   questions: PropTypes.arrayOf(PropTypes.object),
//   setQuestions: PropTypes.func.isRequired,
// };
// QuestionsTab.defaultProps = {
//   questions: [],
// };

// export default QuestionsTab;
