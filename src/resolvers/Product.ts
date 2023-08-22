import { Resolver,  Arg, Ctx, Query, ObjectType, Field, InputType, Args } from 'type-graphql';
import { Product, FindManyProductArgs } from "@generated/type-graphql";
import { MyContext } from '../server';



@Resolver(of => Product)
export class ProductsForUserResolver {
@Query(returns => [Product])
async getUserProducts( 
    @Args() args: FindManyProductArgs,
    @Ctx() { prisma, user }: MyContext,):Promise<Product[] |[]>{
        try {
            
     
    if (user?.nurgePlus) {
        return await  prisma.product.findMany({
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
        return await  prisma.product.findMany({
            ...args,
            where:{
                ...args.where,
                categoryId: {
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


@Query(returns => [Product])
async getUserNotPurchasedProducts( 
    @Args() args: FindManyProductArgs,
    @Ctx() { prisma, user }: MyContext,):Promise<Product[] |[]>{
        try {
            
     
    if (user?.nurgePlus) {
        return []
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
        return await  prisma.product.findMany({
            ...args,
            where:{
                ...args.where,
                categoryId: {
                    notIn: categoryIds
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