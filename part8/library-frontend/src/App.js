import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from "./queries";
import Recommend from "./components/Recommend";
import {
  updateAllAuthorsCache,
  updateAllBooksCache,
  updateAllGenresCache,
} from "./helper";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [filter, setFilter] = useState("");
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  });
  const genres = useQuery(ALL_GENRES);
  const client = useApolloClient();

  useEffect(() => {
    const currentToken = localStorage.getItem("library-user");
    if (currentToken) {
      setToken(currentToken);
    }
  }, []);

  useEffect(() => {
    books.refetch();
  }, [filter]);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      const cache = client.cache;
      updateAllBooksCache(cache, addedBook);
      updateAllGenresCache(cache, addedBook.genres);
      updateAllAuthorsCache(cache, addedBook.author);
      window.alert(`Book ${addedBook.title} added`);
    },
  });

  if (authors.loading || books.loading || genres.loading) {
    return <div>Loading...</div>;
  }

  const logout = () => {
    setPage("login");
    localStorage.clear();
    setToken(null);
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors
        authors={authors.data.allAuthors}
        show={page === "authors"}
        token={token}
      />
      <Books
        books={books.data.allBooks}
        genres={genres.data.allGenres}
        setFilterGenre={setFilter}
        filter={filter}
        show={page === "books"}
      />
      <NewBook show={page === "add"} />
      <Login setPage={setPage} setToken={setToken} show={page === "login"} />
      {<Recommend books={books.data.allBooks} show={page === "recommend"} />}
    </div>
  );
};

export default App;
