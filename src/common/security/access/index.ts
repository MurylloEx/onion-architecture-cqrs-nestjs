import { EstablishmentPermissions } from './establishment.permissions';
import { MessagePermissions } from './message.permissions';
import { PetPermissions } from './pet.permissions';
import { UserPermissions } from './user.permissions';

export const Access = {
  ...MessagePermissions,
  ...UserPermissions,
  ...PetPermissions,
  ...EstablishmentPermissions
};
