
import { ApolloServer } from "@apollo/server";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { httpServer } from "./app";
// import Keyv from "keyv";
// import { KeyvAdapter } from "@apollo/utils.keyvadapter";
// import resolvers from "./graphql/resolver";
// import typeDefs from "./graphql/schema";
import { resolvers } from "@generated/type-graphql";
import * as tq from 'type-graphql';
import { User } from "@prisma/client";
import permissions from "./permission";
// import { CustomTaskCrud } from "./resolvers/Task";
// import permissions from "./graphql/permission";
export interface MyContext {
  prisma: any
user: User | null
}

const server:()=>Promise<ApolloServer<MyContext>> = async() => {
  const schema = await tq.buildSchema({ resolvers  , validate:true})



  return  new ApolloServer<MyContext>({ schema:applyMiddleware(
    schema,
    permissions
  ),   plugins: 
   [ApolloServerPluginDrainHttpServer({ httpServer})],
 })
}


export { server };
