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
  UseFilters,
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
import { StudentResponseDto } from 'src/common/pipes/uppercase/student-response.dto';
import { HttpExceptionFilter } from 'src/filter/http-exception/http-exception.filter';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    const students = this.studentService.getAllStudent();
    return students.map((s) => new StudentResponseDto(s));
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  getStudentid(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    const student = this.studentService.getStudentById(Number(id));
    return new StudentResponseDto(student);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  addStudnet(@Body(new UppercasePipe()) data: CreateStudentDto) {
    const student = this.studentService.createStudent(data);
    return new StudentResponseDto(student);
  }

  @Put(':id')
  updateStudent(@Param('id') id: string, @Body() data: UpdateStudentDto) {
    const student = this.studentService.updateStudent(Number(id), data);
    return new StudentResponseDto(student);
  }

  @Patch(':id')
  partialUpdateStudent(
    @Param('id') id: string,
    @Body() data: Partial<{ name: string; age: number }>,
  ) {
    const student = this.studentService.partialUpdateStudent(Number(id), data);
    return new StudentResponseDto(student);
  }

  @Delete(':id')
  deleteStundet(@Param('id') id: string) {
    const result = this.studentService.deleteStudent(Number(id));
    return {
      message: 'Student deleted successfully',
      student: new StudentResponseDto(result.deletedStudent[0]),
    };
  }
}
