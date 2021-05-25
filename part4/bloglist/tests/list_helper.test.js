const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs); 
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ];

  const biggerList = [
    {
      _id: '3aa675aa5754b765c77885ea8',
      title: 'Something',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    },
    {
      _id: 'cc628384fabb372864a38209',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    },
    {
      _id: '20cc32344be2938f234987a',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    }
  ];

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(biggerList);
    expect(result).toBe(12);
  });
});

describe('favorite blog', () => {
  const biggerList = [
    {
      _id: '3aa675aa5754b765c77885ea8',
      title: 'Something',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    },
    {
      _id: 'cc628384fabb372864a38209',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    },
    {
      _id: '20cc32344be2938f234987a',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    }
  ];

  test('is empty for an empty list', () => {
    expect(listHelper.favoriteBlog([])).toEqual({});
  });

  test('is Go To Statement Considered Harmful when tied', () => {
    expect(listHelper.favoriteBlog(biggerList)).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 4,
    });
  });

  test('is Canonical string reduction when it is', () => {
    biggerList[2].likes = 3;
    expect(listHelper.favoriteBlog(biggerList)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 4,
    });
  });
});

describe('most blogs', () => {
  const biggerList = [
    {
      _id: '3aa675aa5754b765c77885ea8',
      title: 'Something',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    },
    {
      _id: 'cc628384fabb372864a38209',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    },
    {
      _id: '20cc32344be2938f234987a',
      title: 'Go To Statement Considered Harmful',
      author: 'Bob Something',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    }
  ];

  test('is empty for empty array', () => {
    const blogs = [];
    expect(listHelper.mostBlogs(blogs)).toEqual({});
  });

  test('counts Edsger W. Dijkstra blogs to be 2', () => {
    const {author, blogs} = listHelper.mostBlogs(biggerList);

    expect(blogs).toBe(2);
  });

  test('is Edsger W. Dijkstra', () => {
    const {author} = listHelper.mostBlogs(biggerList);

    expect(author).toBe('Edsger W. Dijkstra');
  })
 
});

describe('most likes', () => {
  const biggerList = [
    {
      _id: '3aa675aa5754b765c77885ea8',
      title: 'Something',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    },
    {
      _id: 'cc628384fabb372864a38209',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    },
    {
      _id: '20cc32344be2938f234987a',
      title: 'Go To Statement Considered Harmful',
      author: 'Bob Something',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0
    }
  ];

  test('is empty for empty array', () => {
    const blogs = [];
    expect(listHelper.mostLikes(blogs)).toEqual({});
  });

  test('counts Edsger W. Dijkstra total likes to be 8', () => {
    const {author, likes} = listHelper.mostLikes(biggerList);

    expect(likes).toBe(8);
  });

  test('is Edsger W. Dijkstra', () => {
    const {author} = listHelper.mostLikes(biggerList);

    expect(author).toBe('Edsger W. Dijkstra');
  })
 
});