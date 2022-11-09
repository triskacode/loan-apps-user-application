import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRole, UserState } from 'src/modules/user/user.types';

export class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);

    const manager = new User();

    manager.id = 1;
    manager.email = 'manager@mail.com';
    manager.password = 'password';
    manager.role = UserRole.MANAGER;
    manager.state = UserState.ACTIVE;

    manager.hashPassword();
    repository.save(manager);
  }
}
