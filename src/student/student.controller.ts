import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import Student from './entities/student.entity';

@ApiTags('students')
@ApiSecurity('apiKey')
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @ApiCreatedResponse({ description: 'Student created' })
  @ApiBadRequestResponse({ description: 'Data undefined' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Post()
  create(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<Student | HttpException> {
    return this.studentService.create(createStudentDto);
  }

  @ApiOkResponse({ description: 'Students found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Get()
  findAll(): Promise<Student[] | HttpException> {
    return this.studentService.findAll();
  }

  @ApiOkResponse({ description: 'Student found' })
  @ApiNoContentResponse({ description: 'Student not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Student | HttpException> {
    return this.studentService.findOne(id);
  }

  @ApiOkResponse({ description: 'Student updated' })
  @ApiNoContentResponse({ description: 'Student not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student | HttpException> {
    return this.studentService.update(id, updateStudentDto);
  }
  @ApiOkResponse({ description: 'Student deleted' })
  @ApiNoContentResponse({ description: 'Student not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
