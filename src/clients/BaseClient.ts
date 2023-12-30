// @ts-ignore
import URI from "urijs";

export abstract class BaseClient {
	abstract parentPath: string;
	readonly host: string;

	protected constructor(endpoint: string) {
		this.host = endpoint;
	}

	getHeaders(): any {
		return {
			Accept: "application/json",
			"Content-Type": "application/json",
		};
	}

	getHeadersForFile(): any {
		return {
			Accept: "application/json",
		};
	}

	async postForm<TResponse>(
		resource: string,
		body: FormData
	): Promise<TResponse> {
		const response = await fetch(this.getUrl(resource), {
			method: "POST",
			mode: "cors",
			// credentials: "include",
			headers: this.getHeadersForFile(),
			body: body,
		});
		return (await response.json()) as TResponse;
	}

	async post<TRequestBody, TResponse>(
		resource: string,
		body: TRequestBody
	): Promise<TResponse> {
		const config = {
			onUploadProgress: (progressEvent: { loaded: any }) =>
				console.log(progressEvent.loaded),
		};
		const response = await fetch(this.getUrl(resource), {
			method: "POST",
			mode: "cors",
			// credentials: "include",
			headers: this.getHeaders(),
			body: JSON.stringify(body),
		});
		if (!response.ok) {
			throw new Error(`Failed retrieving response. Status: ${response.status}`);
		}

		try {
			return (await response.json()) as TResponse;
		} catch (err) {
			return {} as TResponse;
		}
	}

	async get<TResponse>(resource: string): Promise<TResponse> {
		const rawUri = new URI(resource);
		const url = decodeURIComponent(rawUri.valueOf());
		const response = await fetch(this.getUrl(url), {
			method: "GET",
			mode: "cors",
			headers: this.getHeaders(),
			// credentials: "include"
		});

		if (!response.ok) {
			throw new Error(`Failed retrieving response. Status: ${response.status}`);
		}

		return (await response.json()) as TResponse;
	}

	async downloadPost<TRequest>(
		resource: string,
		request: TRequest
	): Promise<Blob> {
		const response = await fetch(this.getUrl(resource), {
			method: "POST",
			mode: "cors",
			// credentials: "include",
			headers: this.getHeaders(),
			body: JSON.stringify(request),
		});

		if (!response.ok) {
			throw new Error(`Failed retrieving response. Status: ${response.status}`);
		}

		return response.blob();
	}

	getUrl(path: string): string {
		return `${this.host}${this.parentPath}${path}`;
	}
}
