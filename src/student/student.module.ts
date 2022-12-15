import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentDynamo } from '../db/student/crud-student';

@Module({
  controllers: [StudentController],
  providers: [StudentService, StudentDynamo],
})
export class StudentModule {}
