import React from 'react';

const MostVotes = ({votes, anecdotes}) => {
    const getHighestVotedIndex = () => {
        let length = votes.length;
        let max = -Infinity;
        let result = length;

        while (length--) {
            if (votes[length] > max) {
                max = votes[length];
                result = length;
            }
        }
        return result;
    };

    return (
      <>
        <div>
          {anecdotes[getHighestVotedIndex()]}
        </div>
        <div>
          has {votes[getHighestVotedIndex()]} votes
        </div>
      </>
    );
};

export default MostVotes;