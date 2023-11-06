const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

// Load schema and resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

// MongoDB method
const mongoDataMethods = require("./data/db");

// connect to mongodb
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dattruong88vn:848847@graphql-tutorial.wvhwfvh.mongodb.net/?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("Mongo DB connected");
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ mongoDataMethods }),
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`Server listen on http://localhost:4000${server.graphqlPath}`);
});

connectDB();
