import 'reflect-metadata'

import { app, httpServer } from "./app";
import { server } from "./server";
import cors from "cors";
// import getUser from "./helpers/getUserFromToken";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import { Prisma, PrismaClient } from "@prisma/client";
import getUser from './utils/getUser';
const prisma = new PrismaClient();
const main = async () => {
  
  const startedServer = await server()

//  (await server()).start
await startedServer.start()

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000" , 'http://localhost:3002' , 'http://localhost:3001'],
    }),
    json(),
    expressMiddleware(startedServer, {
      context: async ({ req }) => {
        
        const user = await getUser(req.headers.authorization, prisma );

        // return { user, token: req.headers.authorization };

        return {prisma , user}
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT || 8000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:8000/graphql`);
};



  export default main;