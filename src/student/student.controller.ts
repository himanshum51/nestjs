import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/guards/roles/roles.decorator';
import { Role } from 'src/guards/roles/roles.enums';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.studentService.getAllStudent();
  }

  @Get(':id')
  getStudentid(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.studentService.getStudentById(Number(id));
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  addStudnet(@Body(new UppercasePipe()) data: CreateStudentDto) {
    return this.studentService.createStudent(data);
  }

  @Put(':id')
  updateStudent(@Param('id') id: string, @Body() data: UpdateStudentDto) {
    return this.studentService.updateStudent(Number(id), data);
  }

  @Patch(':id')
  partialUpdateStudent(
    @Param('id') id: string,
    @Body() data: Partial<{ name: string; age: number }>,
  ) {
    return this.studentService.partialUpdateStudent(Number(id), data);
  }

  @Delete(':id')
  deleteStundet(@Param('id') id: string) {
    console.log('delete');
    return this.studentService.deleteStudent(Number(id));
  }
}
