const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => {
      const books = await Book.find({});
      const uniqueAuthors = new Set(); // Use a Set to store unique authors

      books.forEach((book) => {
        uniqueAuthors.add(book.author.toString()); // Convert author to string to ensure uniqueness
      });

      return uniqueAuthors.size; // Return the size of the Set, which represents the number of unique authors
    },
    allBooks: async (root, args) => {
      let query = {};
      console.log("Book.find");

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          query.author = author._id;
        } else {
          // If the author does not exist, return an empty array
          return [];
        }
      }

      if (args.genre) {
        query.genres = args.genre;
      }

      return await Book.find(query).populate("author");
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      console.log("Author.find");
      return authors;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Book: {
    favoriteOf: async (root) => {
      const favoriteMatch = await User.find({
        favoriteGenre: {
          $in: root.genres,
        },
      });
      console.log("User.find");
      return favoriteMatch;
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("you must log in first", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const books = await Book.find({});
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author, bookCount: 1 });
        await author.save();
      } else {
        author = await Author.findOneAndUpdate(
          {
            name: args.author,
          },
          { $inc: { bookCount: 1 } },
          { new: true }
        );
        await author.save();
      }

      const book = new Book({ ...args, author: author._id });

      if (books.find((p) => p.title === args.title)) {
        throw new GraphQLError("Book already exist", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "BAD_BOOK_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book.populate("author") });

      return book.populate("author");
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("you must log in first", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }

      author.born = args.setBornTo;
      await author.save();

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError(error.message, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "sekret") {
        throw new GraphQLError("wrong credential!", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
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
