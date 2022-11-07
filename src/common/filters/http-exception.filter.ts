import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
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
          }, {}) ??
          (exception.message !== 'Bad Request' ? exception.message : null);

        message = 'Bad Request';
        errors = customErrors;
        break;
      case NotFoundException:
        message = 'Not Found';
        errors = exception.message !== 'Not Found' ? exception.message : null;
        break;
      case UnauthorizedException:
        console.log(exception);
        message = 'Unauthorized';
        errors =
          exception.message !== 'Unauthorized' ? exception.message : null;
        break;
      default:
        message = 'Internal Server Error';
        errors =
          exception instanceof HttpException
            ? exception.message !== 'Internal Server Error'
              ? exception.message
              : null
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
