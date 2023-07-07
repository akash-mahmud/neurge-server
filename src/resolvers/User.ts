import { Resolver, Mutation, Arg, Ctx, Args, ArgsType, Field } from 'type-graphql';
import { compare, hash } from 'bcryptjs';
import {
  User, UserCreateInput, CreateOneUserArgs,
  UpdateOneUserArgs
} from "@generated/type-graphql";
import { MyContext } from '../server';
import { CreateOneUserArgsCustom, LoginResponsce, } from '../class/User';
import jwt from "jsonwebtoken";
import { defaultResponsce } from '../class/default';
import { GraphQLError } from 'graphql';

@ArgsType()
export class customTypeForUserUpdate {
  @Field({ nullable: true })
  oldPassword: string
  @Field({ nullable: true })
  updatePass: Boolean
  @Field({ nullable: true })
  newPass: String
}
@Resolver()
export class AuthResolver {
  @Mutation(() => LoginResponsce, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: MyContext
  ): Promise<LoginResponsce | null> {
    const user = await ctx.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      {
        user: {
          id: user.id,

          email: user.email,
        },
      },
      process.env.JWT_SECRET ? process.env.JWT_SECRET : "somesecret",
      {
        algorithm: "HS256",
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return {
      message: "success",
      accessToken: token,
      isAuthenticated: true,
      success: true,
      user: user,
    };
    // return user;
  }
  @Mutation(() => LoginResponsce, { nullable: true })
  async loginAdmin(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: MyContext
  ): Promise<LoginResponsce | null> {
    const user = await ctx.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    if (user.role === 'admin' || user.role === 'superadmin') {
      const token = jwt.sign(
        {
          user: {
            id: user.id,

            email: user.email,
          },
        },
        process.env.JWT_SECRET ? process.env.JWT_SECRET : "somesecret",
        {
          algorithm: "HS256",
          subject: user.id,
          expiresIn: "1d",
        }
      );
      return {
        message: "success",
        accessToken: token,
        isAuthenticated: true,
        success: true,
        user: user,
      };

    } else {
      return new GraphQLError("unAuthorized")
    }

    // return user;
  }
  @Mutation(() => defaultResponsce, { nullable: true })
  async register(
    @Arg('input') input: CreateOneUserArgsCustom,
    @Ctx() ctx: MyContext
  ): Promise<defaultResponsce | null> {
    try {
      const { email, password } = input
      const user = await ctx.prisma.user.findUnique({ where: { email } });

      if (user) {
        throw new Error('User already exist');
      }

      const hashedPassword = await hash(password, 10)
      input.password = hashedPassword
      const userInput: UserCreateInput = { ...input, role: 'public' }
      await ctx.prisma.user.create({
        data: userInput
      })



      return {
        message: 'success',
        success: true
      };
    } catch (error: any) {
      return {
        message: error.message,
        success: false
      };
    }

  }

  @Mutation(() => defaultResponsce, { nullable: true })
  async registerByAdmin(
    @Args() args: CreateOneUserArgs,
    @Ctx() ctx: MyContext
  ): Promise<defaultResponsce | null> {
    try {
      const { email, password } = args.data
      const user = await ctx.prisma.user.findUnique({ where: { email } });

      if (user) {
        throw new Error('User already exist');
      }

      const hashedPassword = await hash(password, 10)
      args.data.password = hashedPassword
      await ctx.prisma.user.create({
        ...args
      })



      return {
        message: 'success',
        success: true
      };
    } catch (error: any) {
      return {
        message: error.message,
        success: false
      };
    }

  }

  @Mutation(() => defaultResponsce, { nullable: true })
  async userUpdateByAdmin(
    @Args() args: UpdateOneUserArgs,
    @Args() args2: customTypeForUserUpdate,
    @Ctx() ctx: MyContext
  ): Promise<defaultResponsce | null> {
    try {
      if (args2.updatePass && args2.newPass && args2.oldPassword && args.data.email?.set) {
        const user = await ctx.prisma.user.findUnique({
          where: {
            email: args.data.email?.set
          }
        })
        if (user) {
          const isPasswordValid = await compare(args2.oldPassword, user?.password);
          if (isPasswordValid) {
            const hashedPassword = await hash(args2.newPass as string, 10)
            await ctx.prisma.user.update({
              where: {
                email: args.data.email?.set,

              },
              data: {
                password: {
                  set: hashedPassword
                }
              }
            })

            return {
              message: 'success',
              success: true
            };
          } else {
            return {
              message: "old password is wrong We can't authorize you",
              success: false


            }
          }

        }
      } else {
        delete args.data.password
        await ctx.prisma.user.update({
          ...args
        })
      }




      return {
        message: 'success',
        success: true
      };
    } catch (error: any) {
      return {
        message: error.message,
        success: false
      };
    }

  }
}


