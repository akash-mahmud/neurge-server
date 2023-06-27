import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { compare , hash} from 'bcryptjs';
import { User , UserCreateInput } from "@generated/type-graphql";
import { MyContext } from '../server';
import { CreateOneUserArgsCustom, LoginResponsce } from '../class/User';
import jwt from "jsonwebtoken";
import { defaultResponsce } from '../class/default';


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

  @Mutation(() => defaultResponsce, { nullable: true })
  async register(
    @Arg('input') input: CreateOneUserArgsCustom,
    @Ctx() ctx: MyContext
  ): Promise<defaultResponsce | null> {
    try {
        const { email , password} = input
        const user = await ctx.prisma.user.findUnique({ where: { email } });
    
        if (user) {
          throw new Error('User already exist');
        }
    
    const hashedPassword = await hash(password, 10)
    input.password= hashedPassword
    const userInput: UserCreateInput ={...input , role:'public' }
    await ctx.prisma.user.create({
        data:userInput
    })
    
    
    
        return {
            message:'success', 
            success: true
        };  
    } catch (error:any) {
        return {
            message:error.message, 
            success: false
        };  
    }

  }
}
