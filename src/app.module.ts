import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [UserModule, StudentModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
