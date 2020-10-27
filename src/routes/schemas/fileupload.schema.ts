import * as Joi from "@hapi/joi";

export default Joi.object({
  file: Joi.any()
    .meta({ swaggerType: "file" })
    .required()
    .description("File upload content"),
  code: Joi.string().required().description("Code to identity the file"),
  tempFile: Joi.boolean().required().default(false).description("if is a temporary file (will be deleted automatically)"),
  path: Joi.string()
    .optional()
    .allow(null, "")
    .description("Path of upload image"),
});


export const makeFilePermanentSchema = Joi.object({
  sourceFilename: Joi.string().required().description("File name on s3 of temp file"),
  destinationFilename: Joi.string().description("File name on s3 to save the temp file")
})

export const checkFileSchema = Joi.object({
  filename: Joi.string().required(),
  tempFile: Joi.boolean().default(false)
})