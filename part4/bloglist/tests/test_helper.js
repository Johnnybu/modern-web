const Blog = require('../models/blog');
const User = require('../models/user');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 4,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Bob Something',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 4,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

const loginForUser = async (username, password) => {
  const loginResponse = await api
    .post('/api/login')
    .send({ username: username, password: password });

  const token = `bearer ${loginResponse.body.token}`;

  return token;
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  loginForUser
};