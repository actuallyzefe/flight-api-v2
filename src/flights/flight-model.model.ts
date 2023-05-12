import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Flight {

  @Prop({ type: String, required: true })
  flight_name: string;

  @Prop({ type: String, required: true })
  to: string;

  @Prop({ type: String, required: true })
  from: string;

  @Prop({ type: String, required: true })
  airline: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Number, required: true })
  departure: Number;

  @Prop({ type: Number, required: true })
  arrival: Number;
}

export type FlightDocument = HydratedDocument<Flight>;
export const FlightSchema = SchemaFactory.createForClass(Flight);
