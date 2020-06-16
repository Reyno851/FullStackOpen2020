const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const emptyList = [];

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList);
    expect(result).toBe(0);
  });

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0,
    },
  ];

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(30);
  });
});

describe('max likes', () => {
  const listWithMultipleBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 10,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 15,
    },
  ];
  test('of multiple blogs is returned correctly', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 15,
    });
  });

  const listWithMultipleFavouriteBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 20,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dij',
      likes: 15,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 20,
    },
  ];
  test('of multiple favourite blogs returns only one author', () => {
    const result = listHelper.favoriteBlog(listWithMultipleFavouriteBlogs);
    // Use toEqual here, not toBe as toEqual compares properties of objects, not entire object itself
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 20,
    });
  });
});


describe('most blogs', ()=> {
  const listWithOneTopBlogs = [
    {
      title: 'Go To Statement Considered Harmful Blog 1',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
    {
      title: 'Go To Statement Considered Harmful Blog 2',
      author: 'Edsger W. Dijkstra',
      likes: 10,
    },
    {
      title: 'Go To Statement Considered Harmful Blog 2',
      author: 'Edsger W. Dijkstra',
      likes: 10,
    },
    {
      title: 'Go To Statement Considered Harmful Blog 2',
      author: 'Edsger W. Dijkstra',
      likes: 10,
    },
    {
      title: 'Go To Statement Considered Useful',
      author: 'Tom',
      likes: 15,
    },
    {
      title: 'Come To Statement Considered Harmful',
      author: 'Tom',
      likes: 15,
    }
  ];

  test('of one author is returned with that one author', () => {
    const result = listHelper.mostBlogs(listWithOneTopBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 4,
    });
  });

  const listWithMultipleTopBlogs = [
    {
      title: 'Go To Statement Considered Harmful Blog 1',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
    {
      title: 'Go To Statement Considered Harmful Blog 2',
      author: 'Edsger W. Dijkstra',
      likes: 10,
    },
    {
      title: 'Go To Statement Considered Useful',
      author: 'Tom',
      likes: 15,
    },
    {
      title: 'Come To Statement Considered Harmful',
      author: 'Tom',
      likes: 15,
    }
  ];

  test('of multiple authors is returned with just one author', () => {
    const result = listHelper.mostBlogs(listWithMultipleTopBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2,
    });
  });

})


describe('most likes', ()=>{
  const listWithOneTopLikes = [
    {
      title: 'Go To Statement Considered Harmful Blog 1',
      author: 'Edsger W. Dijkstra',
      likes: 100,
    },
    {
      title: 'Go To Statement Considered Harmful Blog 2',
      author: 'Edsger W. Dijkstraa',
      likes: 10,
    },
    {
      title: 'Go To Statement Considered Harmful Blog 2',
      author: 'Edsger W. Dijkstraaa',
      likes: 10,
    },
    {
      title: 'Go To Statement Considered Harmful Blog 2',
      author: 'Edsger W. Dijkstraaaa',
      likes: 10,
    },
    {
      title: 'Go To Statement Considered Useful',
      author: 'Tom',
      likes: 15,
    },
    {
      title: 'Come To Statement Considered Harmful',
      author: 'Dick',
      likes: 20,
    }
  ];
  test('of one author is returned with that one author', () => {
    const result = listHelper.mostLikes(listWithOneTopLikes);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 100,
    });
  })

  const listWithMultipleTopLikes = [
    {
      title: 'Go To Statement Considered Harmful Blog 1',
      author: 'Edsger W. Dijkstra',
      likes: 100,
    },
    {
      title: 'Go To Statement Considered Harmful Blog 2',
      author: 'Edsger W. Dijkstraa',
      likes: 100,
    },
    {
      title: 'Go To Statement Considered Harmful Blog 2',
      author: 'Edsger W. Dijkstraaa',
      likes: 100,
    },
    {
      title: 'Go To Statement Considered Harmful Blog 2',
      author: 'Edsger W. Dijkstraaaa',
      likes: 10,
    },
    {
      title: 'Go To Statement Considered Useful',
      author: 'Tom',
      likes: 100,
    },
    {
      title: 'Come To Statement Considered Harmful',
      author: 'Dick',
      likes: 20,
    }
  ];
  test('of multiple authors is returned with just one author', () => {
    const result = listHelper.mostLikes(listWithMultipleTopLikes);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 100,
    });
  })
})


