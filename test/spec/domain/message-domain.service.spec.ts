import { ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'src/common';
import { MessageModule, MessageDomainService } from 'src/domain';

const TESTING_MODULE: ModuleMetadata = {
  imports: [
    MessageModule,
    DatabaseModule
  ]
};

describe('MessageDomainService (Domain)', () => {

  let actualModule: TestingModule;
  let actualService: MessageDomainService;

  afterAll(() => actualModule.close());

  beforeEach(async () => {
    actualModule = await Test.createTestingModule(TESTING_MODULE).compile();
    actualService = actualModule.get<MessageDomainService>(MessageDomainService);
    await actualModule.init();
  });

  it('should return an empty array', async () => {
    const fetchSut = await actualService.fetch();
    expect(fetchSut).toEqual([]);
  });

});
