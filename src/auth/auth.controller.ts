import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  // UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
// import { AuthGuard } from './guards/auth.guard';
// import { Roles } from './decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
// import { RolesGuard } from './guards/roles.guard';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body()
    loginDto: LoginDto,
  ) {
    return await this.authService.login(loginDto);
  }

  // @Get('profile')
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.User)
  // getProfile(@Request() req: RequestWithUser) {
  //   return this.authService.profile(req.user);
  // }
  @ApiBearerAuth()
  @Get('profile')
  @Auth(Role.Admin)
  getProfile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user);
  }
}
