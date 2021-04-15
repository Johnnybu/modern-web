import React from 'react';

const AnecdoteOfTheDay = ({anecdote, votes, castVote, nextAnecdote}) => {
    return (
      <>
        <div>
          {anecdote}
        </div>
        <div>
          has {votes} votes
        </div>
        <button onClick={castVote}>
          vote
        </button>
        <button onClick={nextAnecdote}>
          next anecdote
        </button>
      </>
    )
};

export default AnecdoteOfTheDay;