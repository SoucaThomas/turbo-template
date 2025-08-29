import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get()
  getTest() {
    return {
      message: 'Server is working!',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('auth-ok')
  getAuthOk() {
    return {
      message: 'Auth endpoint is accessible!',
      timestamp: new Date().toISOString(),
    };
  }
}
