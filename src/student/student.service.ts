import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
  private students = [
    {
      id: 1,
      name: 'Himanshu',
      age: 22,
    },
    {
      id: 2,
      name: 'krish',
      age: 21,
    },
  ];

  getAllStudent() {
    return this.students;
  }

  getStudentById(id: number) {
    const student = this.students.find((s) => s.id === id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  createStudent(data: { name: string; age: number }) {
    const newStudent = {
      id: Date.now(),
      ...data,
    };
    this.students.push(newStudent);

    return newStudent;
  }

  updateStudent(id: number, data: { name: string; age: number }) {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new NotFoundException('Student not Found');
    }
    this.students[index] = { id, ...data };
    return this.students[index];
  }

  partialUpdateStudent(
    id: number,
    data: Partial<{ name: string; age: number }>,
  ) {
    const student = this.getStudentById(id);
    Object.assign(student, data);
    return student;
  }

  deleteStudent(id: number) {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new NotFoundException('Not Found');
    }

    const deletedStudnet = this.students.splice(index, 1);
    return { 'deleted studnet': deletedStudnet };
  }
}
