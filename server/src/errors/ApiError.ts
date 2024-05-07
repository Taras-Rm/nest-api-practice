import { HttpStatus } from '@nestjs/common';

export default class ApiError {
  status: string;
  code: number;
  message: string;

  constructor(code: number, status: string, message: string) {
    this.code = code;
    this.status = status;
    this.message = message;
  }

  static getInfo(err: any) {
    const error =
      err instanceof ApiError
        ? err
        : new ApiError(
            HttpStatus.INTERNAL_SERVER_ERROR,
            'failed',
            'some server error',
          );

    return {
      code: error.code,
      data: {
        status: error.status,
        message: error.message,
      },
    };
  }
}
