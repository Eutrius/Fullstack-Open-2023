const listHelper = require("../utils/list_helper");

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("total likes", () => {
  const blogsForTest = require("../utils/blogsForTest");

  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const listWithOneBlog = [blogsForTest[0]];
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(
      listWithOneBlog[0].likes
    );
  });

  test("of a bigger list is calculated right", () => {
    const expectedLikes = 36;
    expect(listHelper.totalLikes(blogsForTest)).toBe(expectedLikes);
  });
});
