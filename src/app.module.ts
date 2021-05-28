import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { DatabaseConnectionService } from './database/connection.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';

import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (database: DatabaseConnectionService) => {
        return <MongooseModuleOptions>{
          uri: database.get(),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        };
      },
      inject: [DatabaseConnectionService],
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        //Mailtrap's user and password
        transport: {
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: 'eca53d965bb31b',
            pass: '5bf7e1a96d6bf3',
          },
        },
        template: {
          // dir: path.resolve(__dirname, '..', 'common', 'templates'),
          // adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    ApiModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
