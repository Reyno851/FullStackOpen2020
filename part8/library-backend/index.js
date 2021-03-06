const { ApolloServer, gql } = require('apollo-server')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) { // If no author or genre arguments, return all books
        return books
      } else if (args.author && !args.genre){ // If author argument only, return books filtered by author
        return books.filter(b => b.author === args.author)
      } else if (!args.author && args.genre){ // If genre argument only, return books filtered by genre
        return books.filter(b => b.genres.includes(args.genre)) 
      } else { // If both arguments, return books filtered by both
        return books.filter(b => b.author === args.author).filter(b => b.genres.includes(args.genre))
      }
    },
    allAuthors: () => authors
  },
  Author: {
    name: (root) => root.name, // Default resolver. Not required to be defined
    id: (root) => root.id, // Default resolver. Not required to be defined
    born: (root) => root.born, // Default resolver. Not required to be defined
    bookCount: (root) => books.filter(b => b.author === root.name).length // Extra custom field created for bookCount
  },
  Mutation: {
    addBook: (root, args) => {
      const book = {...args}
      books = books.concat(book)

      if (!authors.some(a => a.name === args.author)) { // Check if author in new book entry is already in list of authors
        const author = { // If author is new, add author to list of author objects
          name: args.author,
          bookCount: books.filter(b => b.author === args.author).length
          // No need to set 'born' field here as it is set as nullable in Author schema
        }
        authors = authors.concat(author)
      } // If author is not new, do not add author again to list of author objects

      return book // Return book object if addition of book is successful
    },

    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name) // Find given author in list of author objects
      if (!author) { // If author does not exist, return null
        return null
      }
  
      const updatedAuthor = { ...author, born: args.setBornTo } // If author exists, set 'born' field to year set in argument
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a) // Use map to update authors list
      return updatedAuthor
    }   
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})