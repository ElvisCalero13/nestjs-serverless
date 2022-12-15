import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import Student from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentDynamo } from '../db/student/crud-student';

@Injectable()
export class StudentService {
  constructor(private readonly dynamo: StudentDynamo) {}
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const newObj = {
      id: uuid(),
      ...createStudentDto,
    };
    const result = await this.dynamo.putStudent(newObj);
    return result;
  }

  async findAll(): Promise<Student[]> {
    const result = await this.dynamo.scanStudent();
    return result;
  }

  async findOne(id: string): Promise<Student> {
    const result = await this.dynamo.getStudent(id);
    return result;
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const obj = await this.dynamo.getStudent(id);
    if (obj == undefined) {
      return obj;
    }
    const newObj = {
      ...obj,
      ...updateStudentDto,
    };
    const result = await this.dynamo.putStudent(newObj);
    return result;
  }

  async remove(id: string): Promise<Student> {
    const obj = await this.dynamo.getStudent(id);
    if (obj == undefined) {
      return obj;
    }
    this.dynamo.deleteStudent(id);
    return obj;
  }
}
