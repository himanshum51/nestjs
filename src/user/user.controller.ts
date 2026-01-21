import { Body, Controller, Get, HttpCode, Param, Post, Query, Redirect } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
//   @Redirect('https://nestjs.com', 301)
  getusers() {
    console.log('adsadsadsd');
    return this.userService.getalluser();
  }

  @Get(':id')
  getuserwithid(@Param('id') id: string) {
    return this.userService.getuserwithid(Number(id));
  }

  @Get()
  getquerydata(@Query('name') name: string, @Query('age') age: number) {
    return `return query parama ${name} ${age}`;
  }

  @Post()
  getbodydata(@Body('name') name: string, @Body('age') age: number) {
    return `return body param ${name} ${age}`;
  }
}
