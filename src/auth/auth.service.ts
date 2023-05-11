import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user-model.model';
import { SignUpDto } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(userCredentials: SignUpDto) {
    const { email, password } = userCredentials;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new BadRequestException('Invalid User Credentials');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    userCredentials.password = hashedPassword;

    const user = await this.userModel.create(userCredentials);

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async login(userCredentials: LoginDto) {
    const { email, password } = userCredentials;

    // getting the user
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) throw new NotFoundException('No user found');

    const storedHash = user.password;

    // comparing passwords

    const isMatch = await bcrypt.compare(password, storedHash);
    if (!isMatch) throw new BadRequestException('Invalid User Credentials');

    // signing the jsonwebtoken
    const token = this.jwtService.sign({ id: user._id });

    // response
    return { token };
  }
}
