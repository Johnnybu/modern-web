const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');
const bcrypt = require('bcrypt');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }

  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();
});

describe('when there is initially two blogs in the db', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  
  test('the unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs');
  
    response.body.map(r => expect(r.id).toBeDefined());
  });
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
  
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');
  
    const contents = response.body.map(r => r.title);
    expect(contents).toContain(
      'HTML is easy'
    );
  });
  
  test('a valid blog can be added', async () => {
    const users = await helper.usersInDb();
    
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      userId: users[0].id
    };
  
    const token = await helper.loginForUser('root', 'sekret');
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  
    const titles = blogsAtEnd.map(r => r.title);
    expect(titles).toContain(
      'async/await simplifies making async calls'
    );
  });
  
  test('a valid blog is not added when request is not authorized', async () => {
    const users = await helper.usersInDb();
    
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      userId: users[0].id
    };
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  
    expect(response.body.error).toContain(
      'invalid token'
    );
  });
  
  test('likes is defaulted to zero when not supplied', async () => {
    const users = await helper.usersInDb();
    
    const newBlog = {
      title: 'something something',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      userId: users[0].id,
    };
  
    const token = await helper.loginForUser('root', 'sekret');
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    const blogsAtEnd = await helper.blogsInDb();
  
    const likes = blogsAtEnd.map(r => r.likes);
    expect(likes[likes.length - 1]).toBe(0);
  });
  
  test('a blog without a url is not added', async () => {
    const users = await helper.usersInDb();
  
    const newBlog = {
      title: 'A blog without a url',
      author: 'Edsger W. Dijkstra',
      likes: 4,
      userId: users[0].id,
    };
  
    const token = await helper.loginForUser('root', 'sekret');
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(400);
  
    const response = await api.get('/api/blogs');
  
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  
  test('a blog without a title is not added', async () => {
    const users = await helper.usersInDb();
  
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      userId: users[0].id,
    };
  
    const token = await helper.loginForUser('root', 'sekret');
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(400);
  
    const response = await api.get('/api/blogs');
  
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  
  test('a blog can be deleted', async () => {
    const users = await helper.usersInDb();
    
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      userId: users[0].id
    };
  
    const token = await helper.loginForUser('root', 'sekret');
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[blogsAtStart.length - 1];
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204);
  
    const blogsAtEnd = await helper.blogsInDb();
  
    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
    );
  
    const contents = blogsAtEnd.map(r => r.title);
  
    expect(contents).not.toContain(blogToDelete.title);
  });
  
  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
  
    blogToUpdate.likes = 8;
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);
  
    const blogsAtEnd = await helper.blogsInDb();
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    );
  
    const likes = blogsAtEnd[0].likes;
  
    expect(likes).toBe(blogToUpdate.likes);
  });
});

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('is shorter than the minimum allowed length (3)');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if username is missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Path `username` is required');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('password is required');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if password is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'sa'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('password must be at least 3 characters');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});