import {
   Controller,
   Post, 
   Body,
   HttpCode, 
   HttpStatus, 
   UsePipes,
   ValidationPipe,
   UnauthorizedException,
   UseGuards,
   Get,
   Request,  
  } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport'; 

@Controller('auth')
export class AuthController {
    constructor(
    private usersService: UsersService,
    private authService: AuthService,
    ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(
            loginDto.email,
            loginDto.password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.authService.login(user);
    }

    @UseGuards(AuthGuard('jwt')) 
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
