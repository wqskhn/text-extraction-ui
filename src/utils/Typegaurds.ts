import {
	ProcessSuccessResponse,
	ProcessErrorResponse,
} from "../models/TabClientModel";

export const isProcessSuccessResponse = (
	obj: ProcessSuccessResponse | ProcessErrorResponse | undefined
): boolean => {
	return (<ProcessSuccessResponse>obj).code === 200;
};

export const isProcessErrorResponse = (
	obj: ProcessSuccessResponse | ProcessErrorResponse | undefined
): boolean => {
	return (<ProcessSuccessResponse>obj).code !== 200;
};

export const isSuccessResponse = (
	variableToCheck: any
): ProcessSuccessResponse => {
	if ((variableToCheck as ProcessSuccessResponse)?.code === 200) {
		return variableToCheck;
	}
	return variableToCheck;
};
