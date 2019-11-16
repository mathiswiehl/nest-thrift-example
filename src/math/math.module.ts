import { Module, MiddlewareConsumer } from '@nestjs/common';
import { Request, Response, NextFunction, Handler } from 'express';
import { MathHandler } from './math.handler';
import * as bodyParser from 'body-parser';
import { ThriftServerExpress } from '@creditkarma/thrift-server-express';
import { MathService } from './gen/fahrradflucht/thrift/math';

function replaceContentTypeHeader(from, to): Handler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['content-type'] === from) {
      req.headers['content-type'] = to;
    }
    next();
  };
}

@Module({
  providers: [MathHandler],
  exports: [MathHandler],
})
export class MathModule {
  constructor(private mathHandler: MathHandler) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        replaceContentTypeHeader('application/x-thrift', 'application/octet-stream'),
        bodyParser.raw(),
        ThriftServerExpress({
          serviceName: MathService.serviceName,
          handler: new MathService.Processor(this.mathHandler),
        }),
      )
      .forRoutes('thrift');
  }
}
