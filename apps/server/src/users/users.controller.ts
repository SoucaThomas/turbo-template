import { AuthService } from '@mguay/nestjs-better-auth';
import { Controller, Inject } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}
}
