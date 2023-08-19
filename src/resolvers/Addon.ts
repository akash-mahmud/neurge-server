import { Resolver,  Arg, Ctx, Query, ObjectType, Field, InputType, Args } from 'type-graphql';
import { Addon, FindManyAddonArgs , FindUniqueAddonArgs} from "@generated/type-graphql";
import { MyContext } from '../server';



@Resolver(of => Addon)
export class AddonForUserResolver {
@Query(returns => [Addon])
async getUserAddons( 
    @Args() args: FindManyAddonArgs,
    @Ctx() { prisma, user }: MyContext,):Promise<Addon[] |[]>{
        try {
            
     
 
        const purchasedProductIds = await prisma.user.findUnique({
            where:{
                id: user?.id
            }
        }).purchasedAddons({
            select:{
                id:true
            }
        })
        const addonIds = purchasedProductIds?.map((data) => data.id)
        return await  prisma.addon.findMany({
            ...args,
            where:{
                ...args.where,
                id: {
                    in: addonIds
                }
            }
        })

       
        } catch (error) {
            console.log(error);
            
            return []
        }
       
}

@Query(returns => [Addon])

async getUserNotPurchasedAddons( 
    @Args() args: FindManyAddonArgs,
    @Ctx() { prisma, user }: MyContext,):Promise<Addon[] |[]>{
        try {
            
     

        const purchasedProductIds = await prisma.user.findUnique({
            where:{
                id: user?.id
            }
        }).purchasedAddons({
            select:{
                id:true
            }
        })
        const addonIds = purchasedProductIds?.map((data) => data.id)
        return await  prisma.addon.findMany({
            ...args,
            where:{
                ...args.where,
                id: {
                    notIn: addonIds
                }
            }
        })

       
        } catch (error) {
            console.log(error);
            
            return []
        }
       
}

@Query(returns => Addon)

async getUserPurchasedSingleAddon( 
    @Args() args: FindUniqueAddonArgs,
    @Ctx() { prisma, user }: MyContext,):Promise<Addon |null>{
        try {
            

        const addonBelongsTotheUser = await prisma.user.findUnique({
            where:{
                id: user?.id
            },
            include: {
                purchasedAddons: {
                  where: {
                    id: args.where.id,
                  },
                },
              },
        })

        if (addonBelongsTotheUser?.purchasedAddons?.length? addonBelongsTotheUser?.purchasedAddons?.length> 0: false) {
           const addon = prisma.addon.findUnique({
            where: {
                id: args.where.id
            }
           })
            return   addon

        }else{
return null
        }

       
        } catch (error) {
            console.log(error);
            
            return null
        }
       
}

}