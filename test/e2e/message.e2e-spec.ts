import { Server } from 'http';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ModuleMetadata } from '@nestjs/common';
import { ApiModule } from 'src/api/modules';

const TESTING_MODULE: ModuleMetadata = {
  imports: [ApiModule]
};

describe('MessageController (e2e)', () => {

  let actualApp: INestApplication;
  let actualServer: Server;

  afterAll(() => actualApp.close());

  beforeEach(async () => {
    const actualModule = await Test.createTestingModule(TESTING_MODULE).compile();
    actualApp = await actualModule.createNestApplication().init();
    actualServer = actualApp.getHttpServer();
  });

  it('/message/all (GET)', async () => {
    await request(actualServer)
      .get('/message/all')
      .expect(403);
  });

});
