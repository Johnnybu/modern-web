import React from 'react';
import Statistic from './Statistic';

const Statistics = ({good, bad, neutral}) => {
  const total = good + bad + neutral;
  const average = (good - bad)/total;
  const positive = good/total*100 + ' %';
  
  if (total === 0) {
    return (
      <div>No feedback given</div>
    );
  }

  return (
    <table>
      <tbody>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={total} />
        <Statistic text='average' value={average} />
        <Statistic text='positive' value={positive} />
      </tbody>
    </table>
  )
};

export default Statistics;