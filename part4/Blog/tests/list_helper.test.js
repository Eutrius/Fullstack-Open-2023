const listHelper = require("../utils/list_helper");
const blogsForTest = require("../utils/blogsForTest");
const listWithOneBlog = [blogsForTest[0]];

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
      listWithOneBlog[0].likes
    );
  });

  test("of a bigger list is calculated right", () => {
    const expectedLikes = 36;
    expect(listHelper.totalLikes(blogsForTest)).toBe(expectedLikes);
  });
});

describe("favorite blog", () => {
  test("of empty list is empty object", () => {
    expect(listHelper.favoriteBlog([])).toEqual({});
  });

  test("when list has only on blog equals that blog", () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(
      listWithOneBlog[0]
    );
  });

  test("of a bigger list is the blog with the most likes", () => {
    const expectedBlog = blogsForTest[2];
    expect(listHelper.favoriteBlog(blogsForTest)).toEqual(expectedBlog);
  });
});
