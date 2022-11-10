import { UserRole, UserState } from 'src/modules/user/user.types';

export class EmitUserActivatedDto {
  id: number;
  email: string;
  password?: string;
  role?: UserRole;
  state?: UserState;
}
