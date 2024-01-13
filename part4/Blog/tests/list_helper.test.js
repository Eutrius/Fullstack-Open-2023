const listHelper = require("../utils/list_helper");
const listOfBlogs = require("../utils/blogsForTest");
const listWithOneBlog = [listOfBlogs[0]];

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(
      listWithOneBlog[0].likes,
    );
  });

  test("of a bigger list is calculated right", () => {
    const expectedLikes = 36;
    expect(listHelper.totalLikes(listOfBlogs)).toBe(expectedLikes);
  });
});

describe("favorite blog", () => {
  test("of empty list is empty object", () => {
    expect(listHelper.favoriteBlog([])).toEqual({});
  });

  test("when list has only on blog equals that blog", () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(
      listWithOneBlog[0],
    );
  });

  test("of a bigger list is the blog with the most likes", () => {
    const expectedBlog = listOfBlogs[2];
    expect(listHelper.favoriteBlog(listOfBlogs)).toEqual(expectedBlog);
  });
});

describe("most blogs", () => {
  test("of empty list is an empty object", () => {
    expect(listHelper.mostBlogs([])).toEqual({});
  });

  test("of a list with a single blog is the author of that blog", () => {
    const expectedResult = { author: "Michael Chan", blogs: 1 };
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(expectedResult);
  });

  test("of a list with multiple blogs", () => {
    const expectedResult = { author: "Robert C. Martin", blogs: 3 };
    expect(listHelper.mostBlogs(listOfBlogs)).toEqual(expectedResult);
  });
});

describe("most likes", () => {
  test("of empty list is an empty object", () => {
    expect(listHelper.mostLikes([])).toEqual({});
  });

  test("of a list with a single blog is the author of that blog", () => {
    const expectedResult = { author: "Michael Chan", likes: 7 };
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual(expectedResult);
  });

  test("of a list with multiple blogs", () => {
    const expectedResult = { author: "Edsger W. Dijkstra", likes: 17 };
    expect(listHelper.mostLikes(listOfBlogs)).toEqual(expectedResult);
  });
});
