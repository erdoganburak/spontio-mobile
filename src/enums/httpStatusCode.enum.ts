export enum HttpStatusCode {
	NetworkError = 0,
	Success = 200,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	RequestTimeout = 408,
	Conflict = 409,
	InternalServerError = 500,
	All = 999
}
