import React, { useCallback, useEffect, useMemo, useState } from "react";
import Extraction from "../components/TextExtraction";

import { withRequest } from "../utils/ReactUtils";

import { ProcessClient } from "../clients/ProcessClient";

import {
  isProcessErrorResponse,
  isProcessSuccessResponse,
  isSuccessResponse,
} from "../utils/Typegaurds";
import {
  ProcessSuccessResponse,
  ProcessErrorResponse,
} from "../models/TabClientModel";
import { identity } from "lodash";

/**
 * Extraction page contains
 * 1. file Upload component to upload file to server for process
 * 2. Text area component to be uploaded as document to server for process
 * 3. Result area component to display the result from server in the form of tabular form
 * 4. Reset Button to reset the extraction page.
 */

export default () => {
  const [message, setMessage] = useState("");
  const [errorMessagetoggle, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [filetoggle, setFileToggle] = useState(true);
  const [file, setFile] = useState<File | null | undefined>(undefined);
  const inputFileLabelRef = React.useRef<any>(); // use reference for input file
  const [txt, setTxt] = useState(""); //input text
  const [isLoading, setIsLoading] = useState(false);
  const [uploadFileToggle, setUploadFileToggle] = useState(true);
  const [uploadResponse, setUploadResponse] = useState<
    AsyncRequest<ProcessSuccessResponse | ProcessErrorResponse>
  >({}); // response data from fetch

  const client = new ProcessClient();

  /**
   * Set File
   */
  const setFileData = (file: File) => {
    setFile(file);
    setUploadFileToggle(false);
  };

  const isProcessed = useMemo(() => {
    if (uploadResponse.data === undefined) {
      return false;
    } else if (isProcessSuccessResponse(uploadResponse.data)) {
      return true;
    } else if (isProcessErrorResponse(uploadResponse.data)) {
      return true;
    }
    {
      return false;
    }
  }, [uploadResponse.data]);

  useEffect(() => {
    if (uploadResponse.data === undefined && uploadResponse.error) {
      setMessage("Error");
      setErrorMessage(uploadResponse.error.message);
      setIsLoading(false);
      setIsError(true);
    } else if (
      uploadResponse.error === undefined &&
      uploadResponse.data &&
      isProcessSuccessResponse(uploadResponse.data)
    ) {
      setMessage("Successfully Processed");
      setTxt(isSuccessResponse(uploadResponse.data).raw_text);
      setIsLoading(false);
      setIsError(false);
    } else if (
      uploadResponse.error === undefined &&
      uploadResponse.data &&
      isProcessErrorResponse(uploadResponse.data)
    ) {
      setMessage("Error");
      setErrorMessage(isSuccessResponse(uploadResponse.data).message);
      setIsLoading(false);
      setIsError(true);
    }
  }, [uploadResponse]);

  // useEffect(() => {
  // 	//  the alert is displayed for 4 seconds
  // 	setTimeout(() => {
  // 		if (!isLoading) {
  // 			setMessage("");
  // 		}
  // 	}, 4000);
  // }, [isLoading]);

  const disableProcessBtn = useMemo(() => {
    if (filetoggle) {
      return file == null;
    }
    return txt == null || txt === "";
  }, [file, txt, filetoggle]);

  useMemo(() => {
    setTxt("");
    uploadResponse.data = undefined;
    setUploadResponse(uploadResponse);
    setIsError(false);
    setMessage("");
  }, [filetoggle]);
  /**
   * Process File or Input text
   */
  const onProcessClicked = (): void => {
    setMessage("");
    if (filetoggle) {
      if (!file) {
        setMessage("No File Selected");
      } else {
        setIsLoading(true);
        withRequest(client.processPdf(file), setUploadResponse);
      }
    } else {
      if (!txt) {
        setMessage("No text entered");
      } else {
        const file = new File([txt], "inputTxt.txt");

        setIsLoading(true);
        withRequest(client.processDocument(file), setUploadResponse);
      }
    }
  };

  /**
   * Reset
   */
  const onResetClicked = (): void => {
    setMessage("");
    setFile(null);
    resetInputFileLabel();
    resetInputText();
    setUploadFileToggle(true);
    uploadResponse.data = undefined;
    setUploadResponse(uploadResponse);
    setIsLoading(false);
    setIsError(false);
  };

  const resetInputFileLabel = () => {
    inputFileLabelRef.current?.fileLabelChange();
  };

  const resetInputText = () => {
    setTxt("");
  };

  /**
   * Render Component
   */
  return (
    <Extraction
      message={message}
      errorMessagetoggle={errorMessagetoggle}
      isError={isError}
      filetoggle={filetoggle}
      setFileToggle={setFileToggle}
      setFileData={setFileData}
      uploadFileToggle={uploadFileToggle}
      txt={txt}
      setTxt={setTxt}
      disableProcessBtn={disableProcessBtn}
      onProcessClicked={onProcessClicked}
      onResetClicked={onResetClicked}
      isLoading={isLoading}
      isProcessed={isProcessed}
      uploadResponse={uploadResponse}
      inputFileLabelRef={inputFileLabelRef}
    />
  );
};
