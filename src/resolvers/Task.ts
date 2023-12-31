import { Resolver,  Arg, Ctx, Query, ObjectType, Field, InputType, Args } from 'type-graphql';
import { Task, FindManyTaskArgs } from "@generated/type-graphql";
import { MyContext } from '../server';



@Resolver(of => Task)
export class TaskForUserResolver {
@Query(returns => [Task])
async getUserTasks( 
    @Args() args: FindManyTaskArgs,
    @Ctx() { prisma, user }: MyContext,):Promise<Task[] |[]>{
        try {
            
     
    if (user?.nurgePlus) {
        return await  prisma.task.findMany({
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
        return await  prisma.task.findMany({
            ...args,
            where:{
                ...args.where,
                categoryId: {
                    ...args.where?.categoryId,
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