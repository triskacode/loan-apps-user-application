import { Test, TestingModule } from '@nestjs/testing';
import { UserHttpController } from './user.http.controller';

describe('UserHttpController', () => {
  let controller: UserHttpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHttpController],
    }).compile();

    controller = module.get<UserHttpController>(UserHttpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
