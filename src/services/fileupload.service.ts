import * as Boom from "@hapi/boom";
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default class FileUploadService {
  protected sentitiveInfo: never[];

  protected validate(entity: any, payload: any): Promise<boolean> {
    return Promise.resolve(true);
  }

  async uploadFile(payload, u: any) {
    const temp = payload.tempFile;
    const { path } = payload;
    const { hapi } = payload.file;
    const { filename } = hapi;
    const Bucket = temp ? process.env.AWS_S3_TMP_BUCKET : process.env.AWS_S3_BUCKET;
    const Key = path ? `${path}/${filename}` : filename;

    const params = {
      Bucket,
      Key,
      Body: payload.file,
    };

    const fileObject = await s3.upload(params).promise();

    const publicUrl = await s3.getSignedUrlPromise('getObject', {
      Bucket,
      Key,
      Expires: 60 * 60 * 2
    })

    const location = fileObject.Location;

    const file = {
      filename,
      user: u._id,
      code: payload.code,
      metadata: {
        ...hapi,
      },
      url: location,
    };

    return {
      url: file.url,
      filename: file.filename,
      publicUrl,
      key: Key
    };
  }

  async makeFilePermanent(payload, u): Promise<any> {
    const filename = payload.sourceFilename
    const newFilename = payload.destinationFilename
    const copyparams = {
        Bucket: process.env.AWS_S3_BUCKET,
        CopySource: process.env.AWS_S3_TMP_BUCKET + '/' + filename,
        Key: newFilename ? newFilename : filename
    };

    let fileObject;
    try {
      fileObject = await s3.copyObject(copyparams).promise();
    } catch (err) {
      if (err.code === "NoSuchKey") throw Boom.notFound("filename does not exist")
      return
    }

    const deleteparams = {
        Bucket : process.env.AWS_S3_TMP_BUCKET,
        Key : filename
    };

    try {
      await s3.deleteObject(deleteparams).promise();
    } catch (err) {
      console.log(err)
    }

    const publicUrl = await s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: newFilename ? newFilename : filename,
      Expires: 60 * 60 * 2
    })

    return {
      url: fileObject.Location,
      bucket: copyparams.Bucket,
      filename: newFilename,
      publicUrl
    };
  }

  async checkFileExists(user, payload): Promise<any> {
    const Bucket = payload.tempFile ? process.env.AWS_S3_TMP_BUCKET : process.env.AWS_S3_BUCKET;
    const params = {
      Bucket,
      Key: payload.filename,
    }

    try {
      await s3.headObject(params).promise();
    } catch (err) {
      console.log(err)
      if (err.code === "NotFound") throw Boom.notFound("file does not exist")
      return
    }

    const publicUrl = await s3.getSignedUrlPromise("getObject", {
     ...params,
      Expires: 60 * 60 * 2
    })

    return {
      bucket: Bucket,
      filename: payload.filename,
      publicUrl
    };
  }
}
