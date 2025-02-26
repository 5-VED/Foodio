class ApiResponse {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;

  constructor(
    statusCode: number,
    data: any,
    message = 'Success',
    success: boolean
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = success;
  }
}

export { ApiResponse };
