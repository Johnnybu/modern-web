import React, { useState } from 'react';
import Button from './Button';
import Statistics from './Statistics';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [goodText, badText, neutralText] = ['good', 'bad', 'neutral'];

  const setFeedback = (feedbackType, feedbackValue) => {
    switch (feedbackType) {
      case 'good':
        return () => setGood(feedbackValue);
      case 'neutral':
        return () => setNeutral(feedbackValue);
      default:
        return () => setBad(feedbackValue);
    };
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={setFeedback(goodText, good + 1)} text={goodText} />
      <Button handleClick={setFeedback(neutralText, neutral + 1)} text={neutralText} />
      <Button handleClick={setFeedback(badText, bad + 1)} text={badText} />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
};

export default App;
