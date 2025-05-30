import { Injectable } from '@nestjs/common';
import { UserDocument } from '@app/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    // Generate the JWT token
    // The JWT token is signed with the secret key from the config service
    const token = this.jwtService.sign(tokenPayload);

    // Set the cookie with the token
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return token;
  }
}
