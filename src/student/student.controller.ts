import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
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
  async create(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<Student | HttpException> {
    const student = await this.studentService.create(createStudentDto);
    if (!student) {
      throw new BadRequestException('Student not created');
    }
    return student;
  }

  @ApiOkResponse({ description: 'Students found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Students not founds' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Get()
  async findAll(): Promise<Student[] | HttpException> {
    const students = await this.studentService.findAll();
    const count = Object.keys(students).length;
    if (count == 0) {
      throw new NotFoundException('Students not founds');
    }
    return students;
  }

  @ApiOkResponse({ description: 'Student found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Student not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Student | HttpException> {
    const student = await this.studentService.findOne(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  @ApiOkResponse({ description: 'Student updated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Student not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student | HttpException> {
    const student = await this.studentService.update(id, updateStudentDto);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }
  @ApiOkResponse({ description: 'Student deleted' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Student not found' })
  @ApiInternalServerErrorResponse({ description: 'Server error' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Student | HttpException> {
    const student = await this.studentService.remove(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }
}
