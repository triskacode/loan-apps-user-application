import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter<T extends Error> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let errors: string;
    let message: string;

    switch (exception.constructor) {
      case BadRequestException:
        const customErrors =
          (exception as any).getResponse().message.reduce?.((prev, error) => {
            const errorMessage = Object.values(error.constraints)[0];

            prev[error.property] = errorMessage;
            return prev;
          }, {}) ?? exception.message;

        message = 'Bad Request';
        errors = customErrors;
        break;
      case NotFoundException:
        message = 'Not Found';
        errors = exception.message;
        break;
      default:
        message = 'Internal Server Error';
        errors =
          exception instanceof HttpException
            ? exception.message
            : 'Whoops, something went wrong';
    }

    response
      .status(
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      )
      .json({
        message,
        errors,
        data: null,
      });
  }
}
