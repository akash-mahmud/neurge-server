import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class defaultResponsce {
    @Field()
    message:String
    success: Boolean
}