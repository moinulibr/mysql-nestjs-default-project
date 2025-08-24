import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Request start...');
    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`Request completed in ${Date.now() - start}ms`);

        // const end = Date.now();
        // const request: { method: string; url: string } = context
        //   .switchToHttp()
        //   .getRequest();
        // const response: { statusCode: number } = context
        //   .switchToHttp()
        //   .getResponse();
        // const { method, url } = request;
        // const { statusCode } = response;
        // const responseTime = end - start;
        // console.log(
        //   `Request: ${method} ${url} - Response: ${statusCode} - Time: ${responseTime}ms`,
        // );
      }),
    );
  }
}
