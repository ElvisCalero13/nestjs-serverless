import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';
import Student from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

const dynamoDB = process.env.IS_OFFLINE
  ? new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: process.env.DYNAMODB_ENDPOINT,
    })
  : new AWS.DynamoDB.DocumentClient();

@Injectable()
export class StudentService {
  async create(createStudentDto: CreateStudentDto): Promise<Student | any> {
    const newObj = {
      id: uuid(),
      ...createStudentDto,
    };
    try {
      await dynamoDB
        .put({
          TableName: 'StudentsTable',
          Item: newObj,
        })
        .promise();
      return newObj;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(): Promise<Student[] | any> {
    try {
      const result = await dynamoDB
        .scan({
          TableName: 'StudentsTable',
        })
        .promise();
      return result.Items;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: string): Promise<Student | any> {
    try {
      const result = await dynamoDB
        .get({
          TableName: 'StudentsTable',
          Key: { id },
        })
        .promise();
      return result.Item;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student | any> {
    try {
      const obj = await this.findOne(id);
      const newObj = {
        ...obj,
        ...updateStudentDto,
      };
      await dynamoDB
        .put({
          TableName: 'StudentsTable',
          Item: newObj,
        })
        .promise();
      return newObj;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async remove(id: string): Promise<Student | any> {
    try {
      const obj = await this.findOne(id);
      await dynamoDB
        .delete({
          TableName: 'StudentsTable',
          Key: { id },
        })
        .promise();
      return obj;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
