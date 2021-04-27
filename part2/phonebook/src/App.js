import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import PersonsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    PersonsService.getPersons()
      .then(persons => {
        setPersons(persons);
      });
  }, []);

  const resetInput = () => {
    setNewName('');
    setNewNumber('');
  };

  const updatePerson = async (person) => {
    if (!window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
      resetInput();
      return;
    }

    person.number = newNumber;
    
    const updatedPerson = await PersonsService.updatePerson(person);

    setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson));
  };

  const addPerson = async (event) => {
    event.preventDefault();

    let person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

    if (person) {
      await updatePerson(person);
      resetInput();
      return;
    }

    person = {
      name: newName,
      number: newNumber
    };

    const newPerson = await PersonsService.createPerson(person);

    setPersons(persons.concat(newPerson));
    resetInput();
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete ${persons.find(p => p.id === id)?.name}?`)) {
      return;
    }

    await PersonsService.deletePerson(id);

    setPersons(persons.filter(p => p.id !== id));
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      
      <Persons filter={filter} persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
