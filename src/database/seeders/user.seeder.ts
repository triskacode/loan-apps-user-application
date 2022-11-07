import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { UserRole } from 'src/modules/user/user.types';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);

    const manager = new User();

    manager.id = 1;
    manager.email = 'manager@mail.com';
    manager.password = 'password';
    manager.role = UserRole.MANAGER;

    manager.hashPassword();
    repository.save(manager);

    const user = new User();

    user.id = 2;
    user.email = 'user@mail.com';
    user.password = 'password';
    user.role = UserRole.USER;

    user.hashPassword();
    repository.save(user);
  }
}
