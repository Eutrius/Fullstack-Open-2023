import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";
import Select from "react-select";

const Authors = (props) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState("");

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    update: (cache, response) => {
      const updatedAuthor = response.data.editAuthor;
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.map((author) =>
            author.name === updatedAuthor.name ? updatedAuthor : author,
          ),
        };
      });
    },
  });

  if (!props.show) {
    return null;
  }

  const authors = [...props.authors];

  const options = authors.map((author) => {
    return { value: author.name, label: author.name };
  });

  const submit = (event) => {
    event.preventDefault();
    updateAuthor({ variables: { name, born: parseInt(born) } });
    setName(null);
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token && (
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <Select
              defaultValue={name}
              onChange={({ value }) => setName(value)}
              options={options}
            />
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authors;
