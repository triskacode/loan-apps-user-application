import { UserRole, UserState } from 'src/modules/user/user.types';

export class EmitUserUpdatedDto {
  id: number;
  email: string;
  role: UserRole;
  state: UserState;
}
