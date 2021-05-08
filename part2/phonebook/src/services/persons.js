import axios from 'axios';

const baseUrl = '/api/persons';

const createPerson = async person => {
    const response = await axios.post(baseUrl, person);
    return response.data;
};

const getPersons = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const deletePerson = async id => {
    return await axios.delete(`${baseUrl}/${id}`);
};

const updatePerson = async person => {
    const response = await axios.put(`${baseUrl}/${person.id}`, person);
    return response.data;
};

const PersonsService = {
    createPerson,
    getPersons,
    deletePerson,
    updatePerson
};

export default PersonsService;