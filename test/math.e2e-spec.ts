import { createHttpClient } from '@creditkarma/thrift-client';
import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { MathService } from '../src/math/gen/fahrradflucht/thrift/math';

describe('MathService (e2e)', () => {
  let app: NestExpressApplication;
  let mathServiceClient: MathService.Client<unknown>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    await app.listen(0);
    const url = new URL(await app.getUrl());

    mathServiceClient = createHttpClient(MathService.Client, {
      hostName: url.hostname,
      port: parseInt(url.port, 10),
      path: '/thrift',
      https: false,
    });
  });

  afterEach(async () => {
    await app.close();
  });

  test('add (thrift)', async () => {
    const response = await mathServiceClient.add({ terms: [1, 2, 3] });

    expect(response.result.toNumber()).toEqual(6);
  });
});
