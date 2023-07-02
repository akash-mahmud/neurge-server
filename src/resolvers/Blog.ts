
import { Resolver, Arg, Ctx, Query, ObjectType, Field, InputType, Args } from 'type-graphql';
import { Blog, FindUniqueBlogArgs } from "@generated/type-graphql";
import { MyContext } from '../server';



@Resolver(of => Blog)
export class BlogForUserResolver {


    @Query(returns => Blog)

    async getUserBlogSingle(
        @Args() args: FindUniqueBlogArgs,
        @Ctx() { prisma, user }: MyContext,): Promise<Blog | null> {
        try {


            if (user?.nurgePlus) {
                return prisma.blog.findUnique({
                    ...args,

                })
            } else {
                const blogDetails = await prisma.blog.findUnique({
                    ...args,

                })
                const addonBelongsTotheUser = await prisma.user.findUnique({
                    where: {
                        id: user?.id
                    },
                    include: {
                        purchasedAddons: {
                            where: {
                                id: blogDetails?.addonId,
                            },
                        },
                    },
                })

                if (addonBelongsTotheUser?.purchasedAddons?.length ? addonBelongsTotheUser?.purchasedAddons?.length > 0 : false) {

                    return blogDetails

                } else {
                    return null
                }
            }

        } catch (error) {
            console.log(error);

            return null
        }

    }

}