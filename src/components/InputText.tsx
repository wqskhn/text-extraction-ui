import React, { Fragment } from "react";

interface InputTextProps {
	readOnly?: boolean;
	selectTextOnFocus?: boolean;
	processBtnStatus?: () => void;
	setTxtData?: (txt: string) => void;
	txtData: string;
}

const InputText = (props: InputTextProps) => {
	const { readOnly = false, setTxtData, txtData } = props;
	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const txt: string = e.target.value;
		if (txt != null && txt != undefined) {
			setTxtData?.(txt);
		}
	}

	return (
		<Fragment>
			<textarea
				value={txtData}
				placeholder={"Please enter text here...."}
				rows={20}
				style={{
					width: "100%",
					// height: "100%",
				}}
				readOnly={readOnly}
				onChange={
					!readOnly
						? (e) => {
								handleChange(e);
						  }
						: () => {}
				}
			>
				{txtData}
			</textarea>
		</Fragment>
	);
};

export default InputText;
