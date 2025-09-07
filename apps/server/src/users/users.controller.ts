import type { AuthService } from '@mguay/nestjs-better-auth';
import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}
}
