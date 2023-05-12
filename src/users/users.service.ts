import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { InjectStripe } from 'nestjs-stripe';
import { Flight } from 'src/flights/flight-model.model';
import Stripe from 'stripe';

@Injectable()
export class UsersService {
  constructor(
    @InjectStripe() private readonly stripe: Stripe,
    @InjectModel(Flight.name) private flightModel: Model<Flight>,
  ) {}

  async checkout(req: Request, id: string) {
    const flight = await this.flightModel.findById(id);
    if (!flight) throw new NotFoundException();

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: flight.price * 100,
            product_data: {
              name: `${flight.flight_name}`,
              description: `${flight.airline}`,
            },
          },
        },
      ],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/accepted`,
      cancel_url: `${req.protocol}://${req.get('host')}/cancelled`,
    });

    return session;
  }
}
