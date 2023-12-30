import { BaseClient } from "./BaseClient";
import {
  ProcessErrorResponse,
  ProcessSuccessResponse,
} from "../models/TabClientModel";

export class ProcessClient extends BaseClient {
  parentPath: string = ""; //** --> /process_document */

  constructor() {
    // @ts-ignore
    super(process.env.EXTRACTION_ENDPOINT ?? "localhost:1234");
  }

  processPdf = async (
    fileToProcess: File
  ): Promise<ProcessSuccessResponse | ProcessErrorResponse> => {
    const formData = new FormData();
    formData.append("pdf_file", fileToProcess); //pdf_file

    return await this.postForm("/process_pdf", formData);
  };

  processDocument = async (
    fileToProcess: File
  ): Promise<ProcessSuccessResponse | ProcessErrorResponse> => {
    const formData = new FormData();
    formData.append("file", fileToProcess);

    const fileContents = await fileToProcess.text();
    return await this.post("/process_document", {
      data: fileContents,
      labels: [],
    });
  };
}
