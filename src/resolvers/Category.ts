import { Resolver,  Arg, Ctx, Query, ObjectType, Field, InputType, Args } from 'type-graphql';
import { Category, FindManyCategoryArgs } from "@generated/type-graphql";
import { MyContext } from '../server';



@Resolver(of => Category)
export class CategoriesForUserResolver {
@Query(returns => [Category])
async getUserCategories( 
    @Args() args: FindManyCategoryArgs,
    @Ctx() { prisma, user }: MyContext,):Promise<Category[] |[]>{
        try {
            
     
    if (user?.nurgePlus) {
        return await  prisma.category.findMany({
            ...args,
         
        })
    }else {
        const purchasedProductIds = await prisma.user.findUnique({
            where:{
                id: user?.id
            }
        }).purchasedCategories({
            select:{
                id:true
            }
        })
        const categoryIds = purchasedProductIds?.map((data) => data.id)
        return await  prisma.category.findMany({
            ...args,
            where:{
                ...args.where,
                id: {
                    in: categoryIds
                }
            }
        })
    }
       
        } catch (error) {
            console.log(error);
            
            return []
        }
       
}


}