import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser, User } from '@app/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // Convert email to lowercase
    createUserDto.email = createUserDto.email.toLowerCase();
    return this.usersService.create(createUserDto); /// Need Email as LowerCase
  }

  @UseGuards(JwtAuthGuard)
  @Get('currentUser')
  async getUser(@CurrentUser() user: User) {
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
