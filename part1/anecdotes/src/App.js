import React, { useState } from 'react';
import AnecdoteOfTheDay from './AnecdoteOfTheDay';
import MostVotes from './MostVotes';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];

  const random = () => Math.floor(Math.random() * anecdotes.length);
   
  const [selected, setSelected] = useState(random());
  const [votes, setVote] = useState(anecdotes.map(() => 0));

  const nextAnecdote = () => setSelected(random());

  const castVote = () => {
    const votesCopy = [...votes];

    votesCopy[selected] += 1;

    setVote(votesCopy);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <AnecdoteOfTheDay votes={votes[selected]} anecdote={anecdotes[selected]} castVote={castVote} nextAnecdote={nextAnecdote} />
      <h1>Anecdote with most votes</h1>
      <MostVotes votes={votes} anecdotes={anecdotes} />
    </>
  );
};

export default App;