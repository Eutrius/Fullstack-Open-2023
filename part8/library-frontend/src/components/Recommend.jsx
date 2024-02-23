import { useQuery } from "@apollo/client";
import { GET_USER } from "../queries";

const Recommend = (props) => {
  const user = useQuery(GET_USER, {
    skip: !props.show,
  });
  if (!props.show || user.loading) {
    return null;
  }
  const favoriteGenre = user.data.me.favoriteGenre;
  const books = [...props.books].filter((book) =>
    book.genres.includes(favoriteGenre),
  );
  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
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
    </div>
  );
};

export default Recommend;
