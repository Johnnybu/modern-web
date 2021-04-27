import React from 'react';

const Persons = ({persons, filter, handleDelete}) => {
    return (
      <ul>
        {
          persons.filter(person => filter === '' ? true : person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)
            .map( person => <li key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></li>)
        }
      </ul>
    );
};

export default Persons;
