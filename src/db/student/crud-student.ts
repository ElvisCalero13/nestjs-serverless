/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import Student from '../../student/entities/student.entity';
import dynamoDB from '../client';

@Injectable()
export class StudentDynamo {
  async putStudent(student: Student): Promise<Student> {
    await dynamoDB
      .put({
        TableName: 'StudentsTable',
        Item: student,
      })
      .promise();
    return student;
  }
  async scanStudent(): Promise<Student[]> {
    const result = await dynamoDB
      .scan({
        TableName: 'StudentsTable',
      })
      .promise();
    return result.Items as Student[];
  }
  async getStudent(id: string): Promise<Student> {
    const result = await dynamoDB
      .get({
        TableName: 'StudentsTable',
        Key: { id },
      })
      .promise();
    return result.Item as Student;
  }
  async deleteStudent(id: string): Promise<void> {
    await dynamoDB
      .delete({
        TableName: 'StudentsTable',
        Key: { id },
      })
      .promise();
  }
}
