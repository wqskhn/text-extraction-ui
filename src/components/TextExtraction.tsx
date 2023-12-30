import React, { useEffect, useState } from "react";
import { LabelColor } from "../models/LabelColor";
import {
  ProcessSuccessResponse,
  ProcessErrorResponse,
} from "../models/TabClientModel";

import HighLighter from "./HighLighter";
import { isSuccessResponse } from "../utils/Typegaurds";
import BasePage from "./BasePage";
import FileUploader from "./FileUploader";
import InputText from "./InputText";
import Message from "./Message";
import colorsJson from "../label_def.json";

interface ExtractionProps {
  message: string;

  errorMessagetoggle: string;

  isError: boolean;
  filetoggle: boolean;
  isLoading: boolean;
  isProcessed: boolean;
  txt: string;
  setTxt: React.Dispatch<React.SetStateAction<string>>;
  uploadResponse: AsyncRequest<ProcessSuccessResponse | ProcessErrorResponse>;
  setFileToggle: (active: boolean) => void;
  setFileData: (file: File) => void;
  uploadFileToggle: boolean;

  disableProcessBtn: boolean;
  onProcessClicked: () => void;
  onResetClicked: () => void;
  inputFileLabelRef?: React.MutableRefObject<any>;
}

export default function Extraction(props: ExtractionProps) {
  const {
    message,
    errorMessagetoggle,
    isError,
    filetoggle,
    isLoading,
    isProcessed,
    txt,
    setTxt,
    setFileToggle,
    setFileData,
    uploadFileToggle,
    disableProcessBtn,
    onProcessClicked,
    onResetClicked,
    uploadResponse,
    inputFileLabelRef,
  } = props;
  const [selectedText, setSelectedText] = useState("");
  const [labelColor, setLabelColor] = useState<LabelColor>();

  return (
    <BasePage>
      <Toolbar
      //requestErrors={ /*this.state.extractionResponse*/ }
      />

      <Card>
        <div className="row">
          <div className="col-sm" style={{ margin: "6px" }}>
            <ToggleSwitch
              label={filetoggle ? "Input Raw Text" : "Upload PDF"}
              checked={filetoggle}
              onCheckedChanged={setFileToggle} // check
            />
          </div>
          <ToggleContainer condition={filetoggle}>
            <TrueContainer>
              <div className="custom-file col-6">
                <FileUploader
                  setFileData={setFileData}
                  ref={inputFileLabelRef}
                />
              </div>
            </TrueContainer>
            <FalseContainer>
              <div className="custom-file col-6"></div>
            </FalseContainer>
          </ToggleContainer>

          <div className="col">
            <IconButton disabled={disableProcessBtn} onClick={onProcessClicked}>
              Process
            </IconButton>
          </div>
          <div className="col">
            <IconButton onClick={onResetClicked}>Reset</IconButton>
          </div>
        </div>

        <br />
        <hr />

        <ToggleContainer condition={message !== ""}>
          <TrueContainer>
            {/* <Message msg={message}></Message> */}
            <ToggleContainer condition={message.includes("Error")}>
              <TrueContainer>
                <div className="text-center">
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="red"
                      className="bi bi-x-lg"
                      viewBox="0 0 16 16"
                      style={{ marginRight: "3px" }}
                    >
                      <path
                        fill-rule="evenodd"
                        d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                      />
                    </svg>

                    {message}

                    <hr />
                  </p>
                </div>
              </TrueContainer>
              <FalseContainer>
                <div className="text-center">
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="green"
                      className="bi bi-check-lg"
                      viewBox="0 0 16 16"
                      style={{ marginRight: "3px" }}
                    >
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                    </svg>

                    {message}
                  </p>
                </div>
              </FalseContainer>
            </ToggleContainer>
          </TrueContainer>
        </ToggleContainer>

        <ToggleContainer condition={isLoading}>
          <TrueContainer>
            <div
              className="row align-items-center justify-content-center"
              style={{ minHeight: "500px" }}
            >
              <Spinner message={"Processing..."} />
            </div>
          </TrueContainer>
        </ToggleContainer>

        <br />
        <ToggleContainer condition={filetoggle}>
          <TrueContainer>
            <ToggleContainer condition={!isProcessed}>
              <TrueContainer>
                <ToggleContainer condition={!isLoading}>
                  <TrueContainer>
                    <ToggleContainer condition={!isError}>
                      <TrueContainer>
                        <div
                          className="row align-items-center justify-content-center"
                          style={{ minHeight: "500px" }}
                        >
                          {"Please Upload a File and Press Process"}
                        </div>
                      </TrueContainer>
                    </ToggleContainer>
                  </TrueContainer>
                </ToggleContainer>
              </TrueContainer>
            </ToggleContainer>
          </TrueContainer>
        </ToggleContainer>

        <ToggleContainer condition={filetoggle}>
          <TrueContainer>
            <div></div>
          </TrueContainer>
          <FalseContainer>
            <ToggleContainer condition={isLoading}>
              <TrueContainer>
                <div></div>
              </TrueContainer>
              <FalseContainer>
                {/* <Card> */}
                <div style={{ minHeight: "400px" }}>
                  <InputText setTxtData={setTxt} txtData={txt} />
                </div>
                {/* </Card> */}
              </FalseContainer>
            </ToggleContainer>
          </FalseContainer>
        </ToggleContainer>

        <ToggleContainer condition={isError}>
          <TrueContainer>
            <ToggleContainer condition={filetoggle}>
              <TrueContainer>
                <div
                  className="row align-items-center justify-content-center"
                  style={{ minHeight: "500px" }}
                >
                  <p className="font-weight-normal text-uppercase">
                    {errorMessagetoggle + "."}
                  </p>
                </div>
              </TrueContainer>
            </ToggleContainer>
          </TrueContainer>
        </ToggleContainer>

        <ToggleContainer condition={isProcessed}>
          <TrueContainer>
            <ToggleContainer condition={!isError}>
              <TrueContainer>
                <div>
                  <div>
                    <div className="row justify-content-center">
                      <div className="col-md-6 border-right border-top">
                        <div style={{ marginTop: "18px" }}>
                          <p className="text-center ">Document Text</p>
                          <hr />
                        </div>

                        {/* <Card> */}
                        <HighLighter
                          text={txt}
                          highlight={selectedText}
                          labelColor={labelColor}
                        />
                        {/* </Card> */}
                      </div>
                      <div className="col-md-6 border-top">
                        <div style={{ marginTop: "18px" }}>
                          <p className="text-center ">Labels</p>

                          <hr />
                        </div>

                        <Card>
                          <div style={{ minHeight: "600px" }}>
                            <Table2
                              associatedRequest={{
                                data: isSuccessResponse(uploadResponse?.data)
                                  ?.prediction,
                                retrievedTime: new Date(),
                                isRequesting: false,
                                error: undefined,
                              }}
                              onRowClicked={(e) => {
                                setSelectedText(e.prediction);
                                let labelColorobj = colorsJson.find(
                                  (o) => o.text === e.label
                                );
                                setLabelColor(labelColorobj);
                              }}
                              allRows={
                                isSuccessResponse(uploadResponse?.data)
                                  ?.prediction ?? []
                              }
                              availablePageSizes={[10, 20, 25]}
                              columns={[
                                { name: "label", title: "Label" },
                                { name: "prediction", title: "Text" },

                                {
                                  title: "Start",
                                  name: "start",
                                },
                                { name: "end", title: "End" },
                              ]}
                              setPageSize={() => {}}
                            />
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </TrueContainer>
            </ToggleContainer>
          </TrueContainer>
        </ToggleContainer>
      </Card>
    </BasePage>
  );
}
