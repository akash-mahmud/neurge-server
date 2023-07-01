


import { Prisma, PrismaClient, User } from '@prisma/client';
import { IJwtPayload } from '../interface/user';
import jwt from 'jsonwebtoken'
import { DefaultArgs } from '@prisma/client/runtime';

const getUser = async (
  token: any,
prisma:  PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined, DefaultArgs>
): Promise<User | null> => {
  const { user } = prisma;

  let loggedInuser: User | null = null;



  try {
    if (token && token.split(" ")[0] === "Bearer") {
      const authToken = token.split(" ")[1];



      const data = jwt.verify(
        authToken,
        process.env.JWT_SECRET ? process.env.JWT_SECRET : "somesecret"
      ) as IJwtPayload;

      const loggedInUserData = await user.findUnique({
        where: {
          id: data.user.id,
        },
      });



      if (loggedInUserData) {
        loggedInuser = loggedInUserData;
      }
    }
  } catch (error: any) {


    loggedInuser = null;
    console.log(error.message);
  }

  return loggedInuser;
};


export default getUser