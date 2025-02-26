class ApiError extends Error {
  statusCode: number;
  data: any;
  success: boolean;
  errors: any[];
  message: string;

  constructor(
    statusCode: number,
    message: string,
    errors: any[] = [],
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;
    this.message = message;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
