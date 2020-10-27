import BaseRouteSimple from "xhelpers-api/lib/base-route-simple";
import FileUploadService from "../services/fileupload.service";

import uploadSchema, { makeFilePermanentSchema, checkFileSchema } from "./schemas/fileupload.schema";

const httpResourcePath = "files";

class RouteFileUpload extends BaseRouteSimple {
  constructor() {
    super(["file-upload"]);

    const fileUploadService = new FileUploadService();

    this.route(
      "POST",
      `/api/${httpResourcePath}`,
      {
        payload: {
          maxBytes: 1e9,
          output: "stream",
          parse: true,
          multipart: true,
        },
        plugins: {
          "hapi-swagger": {
            payloadType: "form",
          },
        },
      },
      true
    )
      .validate({ payload: uploadSchema })
      .handler(async (r, h, u) => {
        const entity = await fileUploadService.uploadFile(r.payload, u);

        return entity
          ? h.response(entity).code(200)
          : h.response("Invalid file").code(400);
      })
      .build();

    this.route(
      "POST",
      `/api/${httpResourcePath}/permanent`,
      {
        description: 'Make a temp file permanent'
      },
      true
    )
      .validate({ payload: makeFilePermanentSchema })
      .handler(async (r, h, u) => {
        const entity = await fileUploadService.makeFilePermanent(r.payload, u);

        return entity
          ? h.response(entity).code(200)
          : h.response("Invalid filename").code(400);
      })
      .build();

    this.route(
      "POST",
      `/api/${httpResourcePath}/check-file`,
      {
        description: "Check if file exists"
      },
      true
    )
      .validate({ payload: checkFileSchema })
      .handler(async (r, h, u) => {
        const entity = await fileUploadService.checkFileExists(u, r.payload);

        return entity
          ? h.response(entity).code(200)
          : h.response("unexpected response from aws").code(400);
      })
      .build();
  }
}

module.exports = [...new RouteFileUpload().buildRoutes()];
