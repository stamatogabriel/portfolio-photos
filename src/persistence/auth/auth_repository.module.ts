import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { UserModule } from '../../domain/user/user.module';
import { AuthRepoProvider } from './auth.provider';

import { JwtStrategy } from '../../auth/strategies/jwt.strategy';

import { jwtConstants } from '../../auth/constants/auth';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    JwtStrategy,
  ],
  providers: [AuthRepoProvider, JwtStrategy],
  exports: [AuthRepoProvider],
})
export class AuthRepositoryModule {}
