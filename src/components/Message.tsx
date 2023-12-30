import React from "react";
import { AlertBox, Scheme } from "./AlertBox";

export interface MessageProps {
	msg: string;
}

const Message = ({ msg }: MessageProps) => {
	let ascheme: Scheme = msg === "Unsuccessfully Processed " ? "danger" : "info";

	return (
		<AlertBox className={"alert-dismissible fade show"} scheme={ascheme}>
			{msg}
		</AlertBox>
	);
};

export default Message;
