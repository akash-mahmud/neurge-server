import { shield } from "graphql-shield";
import { IMiddlewareGenerator } from "graphql-middleware";
import { isAuthenticated } from "../rules";
const permissions: IMiddlewareGenerator<any, any, any> = shield({
  Query: {
  },
  Mutation: {
    // createManyTask: isAuthenticated

  },
});

export default permissions;