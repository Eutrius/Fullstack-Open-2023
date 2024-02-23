import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from "./queries";

const uniqueById = (a) => {
  let seen = new Set();
  return a.filter((item) => {
    let k = item.id;
    return seen.has(k) ? false : seen.add(k);
  });
};

export const updateAllGenresCache = (cache, data) => {
  cache.updateQuery({ query: ALL_GENRES }, ({ allGenres }) => {
    const genres = new Set(allGenres.concat(data));
    return {
      allGenres: [...genres],
    };
  });
};

export const updateAllAuthorsCache = (cache, data) => {
  cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
    return {
      allAuthors: uniqueById(allAuthors.concat(data)),
    };
  });
};

export const updateAllBooksCache = (cache, data) => {
  cache.updateQuery(
    { query: ALL_BOOKS, variables: { genre: "" } },
    ({ allBooks }) => {
      return {
        allBooks: uniqueById(allBooks.concat(data)),
      };
    },
  );
};
