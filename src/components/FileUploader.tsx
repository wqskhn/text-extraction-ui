import React, {
	forwardRef,
	Fragment,
	useImperativeHandle,
	useState,
} from "react";

interface FileUploadProps {
	setFileData: (file: File) => void;
}

const FileUploader = forwardRef((props: FileUploadProps, ref) => {
	const { setFileData } = props;
	const [filename, setFilename] = useState<string | undefined>(
		"Select File..."
	);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.item?.(0);
		if (file != null && file != undefined) {
			setFileData(file);
		}
		setFilename(file?.name);
	};

	/**
	 * handle for parent to change file label in field
	 */
	useImperativeHandle(ref, () => ({
		fileLabelChange() {
			setFilename("Select File...");
		},
	}));

	return (
		<Fragment>
			<div className="custom-file mb-4">
				<input
					type="file"
					className="custom-file-input"
					id="customFile"
					onChange={onChange}
				/>
				<label className="custom-file-label" htmlFor="customFile">
					{filename}
				</label>
			</div>
		</Fragment>
	);
});

export default FileUploader;
