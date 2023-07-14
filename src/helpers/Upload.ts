import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import {v4} from 'uuid'
import {FileUpload} from 'graphql-upload-ts';
import {Upload} from '../resolvers/Media'
import { Upload as UploadOnBucket } from '@aws-sdk/lib-storage';

const s3Client = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: "https://ams3.digitaloceanspaces.com",
  region: "ams3",
  credentials: {
    accessKeyId: "DO00K2X24Z3BC26VBJH6",
    secretAccessKey: "xgYorSoOA4QPZtO/JTnEDL3CjsSAiU8Szqx53pHyaR8"
  }
});


const handleFileUpload = async (file: Upload) => {
  const { createReadStream, filename, mimetype } =  file;

  const key = v4();
  const bucketParams = {
    Bucket: "neurge",
    Body: createReadStream(),
    Key: `${key}/${filename}`,
    // acl: 'public-read',
  
  };
  const parallelUploads3 = new UploadOnBucket({
    client: s3Client,
    params: {...bucketParams , ACL:'public-read' , ContentType:mimetype},
  
  
  });
  return await  parallelUploads3.done();
};

export{
    handleFileUpload
}