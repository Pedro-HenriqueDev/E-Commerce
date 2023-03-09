import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailService } from 'src/emails/email.service';
import { UserCreate } from './dtos/UserCreate.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
      private readonly usersService: UsersService,
      private readonly emailService: EmailService
    ) {}

  @Post()
  async create(@Body() user: UserCreate) {
    return await this.usersService.create(user)
  }

  @Get()
  async allUsers() {
    return await this.usersService.getAll()
  }

  @Get("deleteContato")
  async delete(@Body() email) {
    return await this.usersService.deleteAccounted(email.email)
  }
}
