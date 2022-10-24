import { CommentaryPermissions } from './commentary.permissions';
import { EstablishmentPermissions } from './establishment.permissions';
import { FeedPermissions } from './feed.permissions';
import { MessagePermissions } from './message.permissions';
import { PetPermissions } from './pet.permissions';
import { UserPermissions } from './user.permissions';

export const Access = {
  ...MessagePermissions,
  ...UserPermissions,
  ...PetPermissions,
  ...EstablishmentPermissions,
  ...FeedPermissions,
  ...CommentaryPermissions
};
