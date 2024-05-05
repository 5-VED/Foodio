export const HTTP_CODES = Object.freeze({
  OK: 200,
  CREATED: 201, // The request has been fulfilled and a new resource has been created
  ACCEPTED: 202, // The request has been accepted for processing, but the processing has not been completed

  BAD_REQUEST: 400, // The server cannot process the request due to a client error
  UNAUTHORIZED: 401, // The client must authenticate itself to get the requested response
  FORBIDDEN: 403, // The client does not have access rights to the content
  NOT_FOUND: 404, // The server cannot find the requested resource
  METHOD_NOT_ALLOWED: 405, // The request method is not supported for the requested resource
  CONFLICT: 409, // Indicates that there is a conflict between the current state of the resource and the requested operation

  INTERNAL_SERVER_ERROR: 500, // The server has encountered a situation it doesnt know how to handle
  NOT_IMPLEMENTED: 501, // The server does not support the functionality required to fulfill the request
  SERVICE_UNAVAILABLE: 503, // The server is currently unavailable
});
