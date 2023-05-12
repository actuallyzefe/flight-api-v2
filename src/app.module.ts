import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeModule } from 'nestjs-stripe';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_KEY,
      apiVersion: '2020-08-27',
    }),
  ],
})
export class AppModule {}
