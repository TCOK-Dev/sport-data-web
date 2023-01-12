enum APIResponseCode {
	SUCCESS = 1,
	FAILED = 0,
}

export interface APIResponseType<T> {
	code: APIResponseCode;
	data?: T;
	message: string;
}

export { APIResponseCode };
