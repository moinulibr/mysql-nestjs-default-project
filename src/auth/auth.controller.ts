import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Use local strategy to authenticate user
  // @HttpCode(HttpStatus.OK)
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req: { user: any }): Promise<any> {
  //   return await req.user;
  // }

  // Use JWT strategy to authenticate user
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: { user: { id: number } }) {
    return this.authService.login(req.user.id);
  }

  // Use refresh-jwt strategy to refresh user token
  // @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req: { user: { id: number } }) {
    return this.authService.refreshToken(req.user.id);
  }

  // @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('signout')
  signout(@Request() req: { user: { id: number } }) {
    return this.authService.signOut(req.user.id);
  }
}
