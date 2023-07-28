import { and, shield } from "graphql-shield";
import { IMiddlewareGenerator } from "graphql-middleware";
import { isAdmin, isAuthenticated } from "../rules";

const permissions: IMiddlewareGenerator<any, any, any> = shield({
  Query: {





    addon: isAuthenticated,



    addonBlogCategories: isAuthenticated,

    addonBlogCategory: isAuthenticated,



    addons: isAuthenticated,


    aggregateAddon: isAuthenticated,


    aggregateAddonBlogCategory: isAuthenticated,


    aggregateBlog: isAuthenticated,


    aggregateCategory: isAuthenticated,


    aggregateProduct: isAuthenticated,


    aggregatePrompt: isAuthenticated,


    aggregateTask: isAuthenticated,


    aggregateTip: isAuthenticated,


    aggregateUser: isAuthenticated,


    blog: isAuthenticated,



    blogs: isAuthenticated,


    categories: isAuthenticated,


    category: isAuthenticated,



    findFirstAddon: isAuthenticated,



    findFirstAddonBlogCategory: isAuthenticated,



    findFirstAddonBlogCategoryOrThrow: isAuthenticated,



    findFirstAddonOrThrow: isAuthenticated,



    findFirstBlog: isAuthenticated,



    findFirstBlogOrThrow: isAuthenticated,



    findFirstCategory: isAuthenticated,



    findFirstCategoryOrThrow: isAuthenticated,



    findFirstProduct: isAuthenticated,



    findFirstProductOrThrow: isAuthenticated,



    findFirstPrompt: isAuthenticated,



    findFirstPromptOrThrow: isAuthenticated,



    findFirstTask: isAuthenticated,



    findFirstTaskOrThrow: isAuthenticated,



    findFirstTip: isAuthenticated,



    findFirstTipOrThrow: isAuthenticated,



    findFirstUser: isAuthenticated,



    findFirstUserOrThrow: isAuthenticated,



    getAddon: isAuthenticated,



    getAddonBlogCategory: isAuthenticated,



    getBlog: isAuthenticated,



    getCategory: isAuthenticated,



    getProduct: isAuthenticated,



    getPrompt: isAuthenticated,



    getTask: isAuthenticated,



    getTip: isAuthenticated,



    getUser: isAuthenticated,



    getUserAddons: isAuthenticated,


    getUserBlogSingle: isAuthenticated,


    getUserCategories: isAuthenticated,


    getUserNotPurchasedAddons: isAuthenticated,


    getUserProducts: isAuthenticated,


    getUserPurchasedSingleAddon: isAuthenticated,


    getUserTasks: isAuthenticated,


    groupByAddon: isAuthenticated,


    groupByAddonBlogCategory: isAuthenticated,


    groupByBlog: isAuthenticated,


    groupByCategory: isAuthenticated,


    groupByProduct: isAuthenticated,


    groupByPrompt: isAuthenticated,


    groupByTask: isAuthenticated,


    groupByTip: isAuthenticated,


    groupByUser: isAuthenticated,


    product: isAuthenticated,



    products: isAuthenticated,


    prompt: isAuthenticated,



    prompts: isAuthenticated,


    task: isAuthenticated,



    tasks: isAuthenticated,


    tip: isAuthenticated,



    tips: isAuthenticated,


    user: isAuthenticated,



    users: isAuthenticated,



  },
  Mutation: {





    createManyAddon: and(isAuthenticated, isAdmin),

    createManyAddonBlogCategory: and(isAuthenticated, isAdmin),

    createManyBlog: and(isAuthenticated, isAdmin),

    createManyCategory: and(isAuthenticated, isAdmin),

    createManyProduct: and(isAuthenticated, isAdmin),

    createManyPrompt: and(isAuthenticated, isAdmin),

    createManyTask: and(isAuthenticated, isAdmin),

    createManyTip: and(isAuthenticated, isAdmin),

    createManyUser: and(isAuthenticated, isAdmin),

    createOneAddon: and(isAuthenticated, isAdmin),

    createOneAddonBlogCategory: and(isAuthenticated, isAdmin),

    createOneBlog: and(isAuthenticated, isAdmin),

    createOneCategory: and(isAuthenticated, isAdmin),

    createOneProduct: and(isAuthenticated, isAdmin),

    createOnePrompt: and(isAuthenticated, isAdmin),

    createOneTask: and(isAuthenticated, isAdmin),

    createOneTip: and(isAuthenticated, isAdmin),

    createOneUser: and(isAuthenticated, isAdmin),

    deleteManyAddon: and(isAuthenticated, isAdmin),

    deleteManyAddonBlogCategory: and(isAuthenticated, isAdmin),

    deleteManyBlog: and(isAuthenticated, isAdmin),

    deleteManyCategory: and(isAuthenticated, isAdmin),

    deleteManyProduct: and(isAuthenticated, isAdmin),

    deleteManyPrompt: and(isAuthenticated, isAdmin),

    deleteManyTask: and(isAuthenticated, isAdmin),

    deleteManyTip: and(isAuthenticated, isAdmin),

    deleteManyUser: and(isAuthenticated, isAdmin),

    deleteOneAddon: and(isAuthenticated, isAdmin),


    deleteOneAddonBlogCategory: and(isAuthenticated, isAdmin),


    deleteOneBlog: and(isAuthenticated, isAdmin),



    deleteOneCategory: and(isAuthenticated, isAdmin),



    deleteOneProduct: and(isAuthenticated, isAdmin),



    deleteOnePrompt: and(isAuthenticated, isAdmin),



    deleteOneTask: and(isAuthenticated, isAdmin),



    deleteOneTip: and(isAuthenticated, isAdmin),



    deleteOneUser: and(isAuthenticated, isAdmin),






    registerByAdmin: and(isAuthenticated, isAdmin),



    updateManyAddon: and(isAuthenticated, isAdmin),

    updateManyAddonBlogCategory: and(isAuthenticated, isAdmin),

    updateManyBlog: and(isAuthenticated, isAdmin),

    updateManyCategory: and(isAuthenticated, isAdmin),

    updateManyProduct: and(isAuthenticated, isAdmin),

    updateManyPrompt: and(isAuthenticated, isAdmin),

    updateManyTask: and(isAuthenticated, isAdmin),

    updateManyTip: and(isAuthenticated, isAdmin),

    updateManyUser: and(isAuthenticated, isAdmin),

    updateOneAddon: and(isAuthenticated, isAdmin),



    updateOneAddonBlogCategory: and(isAuthenticated, isAdmin),



    updateOneBlog: and(isAuthenticated, isAdmin),



    updateOneCategory: and(isAuthenticated, isAdmin),



    updateOneProduct: and(isAuthenticated, isAdmin),



    updateOnePrompt: and(isAuthenticated, isAdmin),



    updateOneTask: and(isAuthenticated, isAdmin),



    updateOneTip: and(isAuthenticated, isAdmin),



    updateOneUser: and(isAuthenticated, isAdmin),



    upsertOneAddon: and(isAuthenticated, isAdmin),

    upsertOneAddonBlogCategory: and(isAuthenticated, isAdmin),

    upsertOneBlog: and(isAuthenticated, isAdmin),

    upsertOneCategory: and(isAuthenticated, isAdmin),

    upsertOneProduct: and(isAuthenticated, isAdmin),

    upsertOnePrompt: and(isAuthenticated, isAdmin),

    upsertOneTask: and(isAuthenticated, isAdmin),

    upsertOneTip: and(isAuthenticated, isAdmin),

    upsertOneUser: and(isAuthenticated, isAdmin),

    userUpdateByAdmin: and(isAuthenticated, isAdmin),

  },
},  {allowExternalErrors: true});

export default permissions;