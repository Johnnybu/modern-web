const _ = require('lodash');
const logger = require('./logger');

const dummy = (blogs) => {
  logger.info(blogs.length);
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((previousValue, nextItem) => previousValue + nextItem.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  return _(blogs)
    .map(blog => {
      return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      };
    })
    .sortBy('likes')
    .last();
};

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return {};
  }

  const [author, blogNumber] = _(blogs)
    .countBy('author')
    .entries()
    .maxBy(_.last);

  return {
    author,
    blogs: blogNumber
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  return _.first(_(blogs)
    .groupBy('author')
    .map((blogs, key) => {
      return ({
        author: key,
        likes: _.sumBy(blogs, 'likes')
      });
    })
    .value());

};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};