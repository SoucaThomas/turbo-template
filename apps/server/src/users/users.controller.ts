import { Controller, Get, Request } from '@nestjs/common';
import { AuthService } from '@mguay/nestjs-better-auth';
import { StripePlans } from '@turbo-template/stripe-plans';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Get('session')
  getSession(@Request() req: any) {
    return { user: req.user };
  }

  @Get('stripe/debug')
  debugStripe() {
    return {
      plans: StripePlans,
      betterAuthPlans: StripePlans.map(plan => ({
        name: plan.id,
        priceId: plan.priceId,
      })),
    };
  }

  @Get('subscription/current')
  getCurrentSubscription(@Request() req: any) {
    return {
      user: req.user,
      message:
        'Check your subscription status in the frontend or Stripe dashboard',
    };
  }
}
