/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import Student from './entities/student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

describe('StudentController', () => {
  let controller: StudentController;
  let spyService: StudentService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: StudentService,
      useFactory: () => ({
        create: jest.fn((dto: CreateStudentDto) => {
          const result: Student = {
            id: uuid(),
            ...dto,
          };
          return result;
        }),
        findAll: jest.fn(() => []),
        findOne: jest.fn(() => {}),
        update: jest.fn((id: string, dto: UpdateStudentDto) => {
          const result: Student = {
            id: id,
            dni: '',
            name: dto.name,
            lastname: dto.lastname,
            career: dto.career,
            level: dto.level,
          };
          return result;
        }),
        remove: jest.fn(() => {}),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [StudentService, ApiServiceProvider],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    spyService = module.get<StudentService>(StudentService);
  });

  it('calling create method', () => {
    const dto: CreateStudentDto = {
      dni: '0919484170',
      name: 'Elvis',
      lastname: 'Calero',
      career: 'System Engineer',
      level: 6,
    };
    expect(controller.create(dto)).not.toEqual(null);
    expect(controller.create(dto)).toEqual({
      id: expect.any(String),
      dni: dto.dni,
      name: dto.name,
      lastname: dto.lastname,
      career: dto.career,
      level: dto.level,
    });
    expect(spyService.create).toHaveBeenCalled();
    expect(spyService.create).toHaveBeenCalledWith(dto);
  });

  it('calling update method', () => {
    const id: string = uuid();
    const dto: UpdateStudentDto = {
      name: 'Elvis',
      lastname: 'Calero',
      career: 'System Engineer',
      level: 6,
    };
    expect(controller.update(id, dto)).not.toEqual(null);
    expect(controller.update(id, dto)).toEqual({
      id: id,
      dni: expect.any(String),
      name: dto.name,
      lastname: dto.lastname,
      career: dto.career,
      level: dto.level,
    });
  });

  it('calling findAll method', () => {
    controller.findAll();
    expect(spyService.findAll).toHaveBeenCalled();
  });

  it('calling findOne method', () => {
    const id = '3789';
    controller.findOne(id);
    expect(spyService.findOne).toHaveBeenCalled();
  });
});
