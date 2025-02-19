import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/enums/role.enum';
import { ROLES_KEY } from '../constants/contants';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
