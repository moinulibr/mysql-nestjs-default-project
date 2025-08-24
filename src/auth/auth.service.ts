import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import { CurrentUser } from './types/current-user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email: string, password: string) {
    const user: any = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordMatch = await compare(
      password,
      (user as { password: string }).password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: (user as { id: string }).id };
  }

  async login(userId: number) {
    // const payload: AuthJwtPayload = { sub: userId };
    // const token = this.jwtService.sign(payload);
    // const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);

    // return this.jwtService.sign(payload);

    const { accessToken, refreshToken } =
      await this.generateAccessToken(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);

    // Store the hashed refresh token in the database
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);

    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async generateAccessToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(userId: number) {
    const { accessToken, refreshToken } =
      await this.generateAccessToken(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);

    // Store the hashed refresh token in the database
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);

    return {
      id: userId,
      accessToken,
      refreshToken,
    };
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);

    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('User not found');
    }

    const isRefreshTokenMatch = await argon2.verify(
      String(user.hashedRefreshToken),
      refreshToken,
    );

    if (!isRefreshTokenMatch) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return { id: userId };
  }

  async signOut(userId: number) {
    // Invalidate the refresh token by setting it to undefined in the database
    await this.userService.updateRefreshToken(userId, undefined);
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findOne(userId);

    if (!user) throw new UnauthorizedException('User not found');

    const currentUser: CurrentUser = { id: +user.id, role: user.role };
    return currentUser;
  }
}
