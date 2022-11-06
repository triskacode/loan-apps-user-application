import { Test, TestingModule } from '@nestjs/testing';
import { UserMicroserviceController } from './user.microservice.controller';

describe('UserMicroserviceController', () => {
  let controller: UserMicroserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMicroserviceController],
    }).compile();

    controller = module.get<UserMicroserviceController>(UserMicroserviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
