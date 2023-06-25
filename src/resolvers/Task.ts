// import { Resolver , Query, ClassType, FieldResolver, Ctx} from "type-graphql";
// import { Task, TaskCrudResolver , FindManyTaskArgs, Category} from "@generated/type-graphql";
// import { GraphQLResolveInfo } from "graphql";
// import { MyContext } from "../server";

// // @Resolver(Task)
// // export class CustomTaskCrud extends (TaskCrudResolver as ClassType){
// //     @Query()
// //     async tasks(ctx: any, info: GraphQLResolveInfo, args: FindManyTaskArgs): Promise<{ tasks: Task[], total: number }> {
// //       const [tasks, total] = await Promise.all([
// //         this.findManyTask(),
// //         this.countTask(),
// //       ]);
  
// //       return { tasks, total };
// //     }

// // }

// class returnType {
 
//         tasks: Task[];
//         total: number;
    
// }
// @Resolver(of => Task)
// export class CustomTaskCrud  {
//   @FieldResolver(type => returnType, { nullable: true })
//   async tasks(_:any,
//     @Ctx() { prisma }: MyContext,
//   ): Promise<returnType | undefined> {
//     const [favoritePost] = await prisma.task.findOne()

//     return favoritePost;
//   }
// }

