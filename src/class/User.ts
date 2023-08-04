import { Args, ArgsType, Field, InputType, ObjectType, } from "type-graphql";
import { User,







} from "@generated/type-graphql";

// export type ResponceUser = Omit<User, 'password'>;

@ObjectType()
export class LoginResponsce {
    @Field({ nullable: true} )
    accessToken?: String
    @Field({ nullable: true} )
    user?: User
    @Field()
    success?: Boolean
    @Field()
    isAuthenticated?: Boolean

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


@InputType({ description: "New user data" })
export class UpdateProfileArgs implements Partial<User>{
    @Field()
    name: string;
    @Field({ nullable: true })
    avater?: string;
    @Field()
    email: string;


}