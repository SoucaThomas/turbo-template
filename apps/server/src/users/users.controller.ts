import { Controller } from '@nestjs/common';
import { AuthService } from '@mguay/nestjs-better-auth';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}
}
