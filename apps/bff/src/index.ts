// apps/bff/src/index.ts
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const startServer = async () => {
  await startStandaloneServer(server, {
    listen: {
      port: 3033, // Use a different port from your main backend
      host: 'recurcrypt-bff.denliehoo.localhost',
    },
  });
  console.log(
    '🚀  BFF Server ready at: http://recurcrypt-bff.denliehoo.localhost:3033/',
  );
};

startServer();
