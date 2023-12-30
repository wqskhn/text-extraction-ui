export interface Prediction {
	label: string;
	prediction: string;
	start: number;
	end: number;
}

export interface ProcessErrorDetail {
	loc: string[];
	msg: string;
	type: string;
}

export interface ProcessSuccessResponse {
	code: number;
	prediction: Prediction[];
	raw_text: string;
	message: string;
}

export interface ProcessErrorResponse {
	//detail: ProcessErrorDetail[];
	errors: HTTPValidationError;
}

export interface BodyProcessPDFUploadProcessPDFPost {
	title?: string;
	required?: string[];
	type?: string;
	properties?: BodyProcessPDFUploadProcessPDFPostProperties;
}

export interface BodyProcessPDFUploadProcessPDFPostProperties {
	pdf_file?: PDFFile;
}

export interface PDFFile {
	title?: string;
	type?: Type;
	format?: string;
}

export enum Type {
	Integer = "integer",
	String = "string",
}

export interface HTTPValidationError {
	title?: string;
	type?: string;
	properties?: HTTPValidationErrorProperties;
}

export interface HTTPValidationErrorProperties {
	detail?: Detail;
}

export interface Detail {
	title?: string;
	type?: string;
	items?: DetailItems;
}

export interface DetailItems {
	$ref?: string;
}

export interface Label {
	title?: string;
	required?: string[];
	type?: string;
	properties?: LabelProperties;
	description?: string;
}

export interface LabelProperties {
	label?: End;
	start?: End;
	end?: End;
	prediction?: End;
}

export interface End {
	title?: string;
	type?: Type;
}

export interface LabeledDocument {
	title?: string;
	required?: string[];
	type?: string;
	properties?: LabeledDocumentProperties;
	description?: string;
}

export interface LabeledDocumentProperties {
	data?: End;
	labels?: Detail;
}

export interface PredictionOutputElement {
	title?: string;
	required?: string[];
	type?: string;
	properties?: LabelProperties;
}

export interface PredictionResponse {
	title?: string;
	required?: string[];
	type?: string;
	properties?: PredictionResponseProperties;
}

export interface PredictionResponseProperties {
	code?: End;
	predictions?: Detail;
}

export interface ValidationError {
	title?: string;
	required?: string[];
	type?: string;
	properties?: ValidationErrorProperties;
}

export interface ValidationErrorProperties {
	loc?: LOC;
	msg?: End;
	type?: End;
}

export interface LOC {
	title?: string;
	type?: string;
	items?: LOCItems;
}

export interface LOCItems {
	type?: Type;
}
