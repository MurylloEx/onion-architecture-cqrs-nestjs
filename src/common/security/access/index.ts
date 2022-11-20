import { MessagePermissions } from './message.permissions';
import { UserPermissions } from './user.permissions';

export const Access = {
  ...MessagePermissions,
  ...UserPermissions
};
