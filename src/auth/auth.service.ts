import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    const user = await this.userService.findOneByEmail(registerDto.email);

    if (user) throw new BadRequestException('User already exists');

    const userCreated = await this.userService.create({
      ...registerDto,
      password: await bcryptjs.hash(registerDto.password, 10),
    });
    return {
      name: userCreated.name,
      email: userCreated.email,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmailWithPassword(
      loginDto.email,
    );

    if (!user) throw new BadRequestException('User not found');

    const { password: DbPassword, email, role } = user;
    const isValidPassword = await bcryptjs.compare(
      loginDto.password,
      DbPassword,
    );
    if (!isValidPassword) throw new UnauthorizedException('Invalid password');
    const payload = { email, role };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async profile({ email }: { email: string; role: string }) {
    return await this.userService.findOneByEmail(email);
  }
}
