import { Field, InputType, ObjectType } from "type-graphql";
import { User, CreateOneUserArgs, UserCreateInput } from "@generated/type-graphql";

// export type ResponceUser = Omit<User, 'password'>;

@ObjectType()
export class LoginResponsce {
    @Field()
    accessToken: String
    @Field()
    user: User
    @Field()
    success: Boolean
    @Field()
    isAuthenticated: Boolean

    @Field()
    message: String
}
@InputType({ description: "New user data" })
export class CreateOneUserArgsCustom implements Partial<User>{
    @Field()
    name: string;
    @Field({ nullable: true })
    avater?: string;
    @Field()
    email: string;
    @Field()

    password: string;

}