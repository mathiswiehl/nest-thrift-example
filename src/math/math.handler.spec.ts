import { Test, TestingModule } from '@nestjs/testing';
import { MathHandler } from './math.handler';
import { Int64 } from '@creditkarma/thrift-server-core';

describe('MathHandler', () => {
  let provider: MathHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MathHandler],
    }).compile();

    provider = module.get(MathHandler);
  });

  it('should add three numbers correctly', () => {
    expect(provider.add({ terms: [1, 2, 3].map(n => new Int64(n)) })).toEqual({
      result: new Int64(6),
    });
  });
});
