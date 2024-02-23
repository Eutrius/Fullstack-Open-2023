const Book = require("./models/book");
const Author = require("./models/author");
const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const User = require("./models/User");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};
      const { author, genre } = args;
      if (author) {
        query.author = author;
      }
      if (genre) {
        query.genres = genre;
      }
      const books = await Book.find(query).populate("author");
      return books;
    },
    allAuthors: async () => await Author.find({}),
    allGenres: async () => {
      const books = await Book.find({});
      let genres = [];
      for (let book of books) {
        for (let genre of book.genres) {
          if (!genres.includes(genre)) {
            genres.push(genre);
          }
        }
      }
      return genres;
    },

    me: (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      return currentUser;
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = await resolvers.Mutation.addAuthor(
          root,
          { name: args.author },
          { currentUser },
        );
      }

      const newBook = new Book({
        ...args,
        author: author._id,
      });

      try {
        const book = await newBook.save();

        author.bookCount += 1;
        await author.save();

        await book.populate("author");
        pubsub.publish("BOOK_ADDED", { bookAdded: book });
        return book;
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invaligArgs: args.name,
            error,
          },
        });
      }
    },
    addAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = new Author({
        name: args.name,
        bookCount: 0,
      });
      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Saving author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invaligArgs: args.name,
            error,
          },
        });
      }
      return author;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      if (author) {
        try {
          author.born = args.setBornTo;
          await author.save();
        } catch (error) {
          throw new GraphQLError("Editing author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invaligArgs: args.name,
              error,
            },
          });
        }
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invaligArgs: args.name,
            error,
          },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password") {
        throw new GraphQLError("login failed", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
