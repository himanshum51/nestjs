export class StudentResponseDto {
  id: number;
  name: string;

  constructor(student: any) {
    this.id = student.id;
    this.name = student.name;
  }
}
