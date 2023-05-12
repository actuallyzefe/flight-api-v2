import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from 'src/flights/flight-model.model';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
