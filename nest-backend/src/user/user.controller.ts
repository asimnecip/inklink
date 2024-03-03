// src/user/user.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto.username, createUserDto.walletAddress);
  }
  @Get('check/:walletAddress')
  async checkUser(@Param('walletAddress') walletAddress: string) {
    return this.userService.checkUserExists(walletAddress);
  }
}
