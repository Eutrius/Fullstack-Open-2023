const Books = ({ genres, books, setFilterGenre, refetch, filter, show }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      {filter && (
        <p>
          in genre <b>{filter}</b>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setFilterGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setFilterGenre("")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
