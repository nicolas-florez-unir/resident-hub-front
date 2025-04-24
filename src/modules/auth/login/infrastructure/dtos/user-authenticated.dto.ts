import type { UserDto } from 'src/modules/user/domain/dtos/user.dto';

export interface UserAuthenticatedDto {
  user: UserDto;
  accessToken: string;
}
