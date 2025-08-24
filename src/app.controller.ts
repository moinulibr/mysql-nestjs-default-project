import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string | undefined {
    // return this.appService.getHello();
    // return this.configService.get('APP_NAME');
    return this.configService.get('dbConfig.dev.type');
  }
}
