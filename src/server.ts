
import { ApolloServer } from "@apollo/server";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { graphqlUploadExpress }from 'graphql-upload-ts';

import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { httpServer } from "./app";
// import Keyv from "keyv";
// import { KeyvAdapter } from "@apollo/utils.keyvadapter";
// import resolvers from "./graphql/resolver";
// import typeDefs from "./graphql/schema";
import { resolvers } from "@generated/type-graphql";
import * as tq from 'type-graphql';
import { Prisma, PrismaClient, User } from "@prisma/client";
import permissions from "./permission";
import { AuthResolver } from "./resolvers/User";
import { DefaultArgs } from "@prisma/client/runtime";
import { ProductsForUserResolver } from "./resolvers/Product";
import { TaskForUserResolver } from "./resolvers/Task";
import { CategoriesForUserResolver } from "./resolvers/Category";
import { AddonForUserResolver } from "./resolvers/Addon";
import { BlogForUserResolver } from "./resolvers/Blog";
import { MediaResolver } from "./resolvers/Media";
// import { CustomTaskCrud } from "./resolvers/Task";
// import permissions from "./graphql/permission";
export interface MyContext {
  prisma:  PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined, DefaultArgs>
user: User | null
}

const server:()=>Promise<ApolloServer<MyContext>> = async() => {
  
  const schema = await tq.buildSchema({ resolvers:[...resolvers , AuthResolver , ProductsForUserResolver , TaskForUserResolver , CategoriesForUserResolver, AddonForUserResolver , BlogForUserResolver , MediaResolver]  , validate:true})



  return  new ApolloServer<MyContext>({ schema:applyMiddleware(
    schema,
    permissions
  ),   plugins: 
   [ApolloServerPluginDrainHttpServer({ httpServer})],
   
 })
}


export { server };
