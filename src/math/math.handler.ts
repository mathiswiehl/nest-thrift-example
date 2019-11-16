import { Injectable } from '@nestjs/common';
import { IHandler as IMathServiceHandler } from 'src/math/gen/fahrradflucht/thrift/math/MathService';
import { IAddResponse, IAddRequest } from 'src/math/gen/fahrradflucht/thrift/math';
import { Int64 } from '@creditkarma/thrift-server-core';

@Injectable()
export class MathHandler implements IMathServiceHandler {
  add(request: IAddRequest): IAddResponse {
    return {
      result: new Int64(
        request.terms.reduce((res, term) => res + term.toNumber(), 0),
      ),
    };
  }
}
