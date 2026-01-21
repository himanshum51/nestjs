import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getAll() {
    return this.studentService.getAllStudent();
  }

  @Get(':id')
  getStudentid(@Param('id') id: string) {
    return this.studentService.getStudentById(Number(id));
  }

  @Post()
  addStudnet(@Body() data: { name: string; age: number }) {
    return this.studentService.createStudent(data);
  }

  @Put(':id')
  updateStudent(
    @Param('id') id: string,
    @Body() data: { name: string; age: number },
  ) {
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
