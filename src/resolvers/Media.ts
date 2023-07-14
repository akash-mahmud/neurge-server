import { Arg, Mutation, Resolver } from "type-graphql";
import {FileUpload, GraphQLUpload} from 'graphql-upload-ts';
import { ArgsType, Field } from 'type-graphql';
import { handleFileUpload } from "../helpers/Upload";
import { defaultResponsce } from "../class/default";
import { Stream } from "stream";
import { fileUploadResponsce } from "../class/media.class";

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
@Resolver()
export class MediaResolver{
    @Mutation(() => fileUploadResponsce, { nullable: true })
    async uploadFile(@Arg('file', () => GraphQLUpload) file: Upload): Promise<fileUploadResponsce> {
        // Handle file upload logic here
        
        const response:any = await handleFileUpload(file);

        return {
          message:'success',
          file:response.Key ,
          success:true
        }
      }
    
}