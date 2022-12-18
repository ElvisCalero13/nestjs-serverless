/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

describe('StudentController', () => {
  let controller: StudentController;
  const mockService = {
    findAll: jest.fn().mockResolvedValue([
      {
        id: '1',
        dni: '0919484170',
        name: 'Elvis',
        lastname: 'Calero',
        career: 'System Engineer',
        level: 10,
      },
      {
        id: '2',
        dni: '0919484121',
        name: 'Alex',
        lastname: 'Calero',
        career: 'Designer',
        level: 6,
      },
    ]),
    findOne: jest.fn().mockImplementation((id: string) =>
      Promise.resolve({
        id,
        dni: '0919484170',
        name: 'Elvis',
        lastname: 'Calero',
        career: 'System Engineer',
        level: 10,
      }),
    ),
    create: jest
      .fn()
      .mockImplementation((dto: CreateStudentDto) =>
        Promise.resolve({ id: 'abc123', ...dto }),
      ),
    update: jest
      .fn()
      .mockImplementation((id: string, dto: UpdateStudentDto) =>
        Promise.resolve({ id, dni: '0919484170', ...dto }),
      ),
    remove: jest.fn().mockImplementation((id: string) =>
      Promise.resolve({
        id,
        dni: '0919484170',
        name: 'Elvis',
        lastname: 'Calero',
        career: 'System Engineer',
        level: 10,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [StudentService],
    })
      .overrideProvider(StudentService)
      .useValue(mockService)
      .compile();

    controller = module.get<StudentController>(StudentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should get an array of students', () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          id: '1',
          dni: '0919484170',
          name: 'Elvis',
          lastname: 'Calero',
          career: 'System Engineer',
          level: 10,
        },
        {
          id: '2',
          dni: '0919484121',
          name: 'Alex',
          lastname: 'Calero',
          career: 'Designer',
          level: 6,
        },
      ]);
      expect(mockService.findAll).toHaveBeenCalled();
      expect(mockService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should get a single student', () => {
      expect(controller.findOne('1')).resolves.toEqual({
        id: '1',
        dni: '0919484170',
        name: 'Elvis',
        lastname: 'Calero',
        career: 'System Engineer',
        level: 10,
      });
      expect(mockService.findOne).toHaveBeenCalled();
      expect(mockService.findOne).toHaveBeenCalledTimes(1);
      expect(mockService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a new student', () => {
      const dto: CreateStudentDto = {
        dni: '0954025474',
        name: 'Veronica',
        lastname: 'Macias',
        career: 'Teacher',
        level: 8,
      };
      expect(controller.create(dto)).resolves.toEqual({
        id: 'abc123',
        dni: '0954025474',
        name: 'Veronica',
        lastname: 'Macias',
        career: 'Teacher',
        level: 8,
      });
      expect(mockService.create).toHaveBeenCalled();
      expect(mockService.create).toHaveBeenCalledTimes(1);
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update a student', () => {
      const dto: UpdateStudentDto = {
        //dni: '0919484170',
        name: 'Elvis Fabian',
        lastname: 'Calero Manueles',
        career: 'System Engineer',
        level: 7,
      };
      expect(controller.update('1', dto)).resolves.toEqual({
        id: '1',
        dni: '0919484170',
        name: 'Elvis Fabian',
        lastname: 'Calero Manueles',
        career: 'System Engineer',
        level: 7,
      });
      expect(mockService.update).toHaveBeenCalled();
      expect(mockService.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove a student', () => {
      expect(controller.remove('1')).resolves.toEqual({
        id: '1',
        dni: '0919484170',
        name: 'Elvis',
        lastname: 'Calero',
        career: 'System Engineer',
        level: 10,
      });
      expect(mockService.remove).toHaveBeenCalled();
      expect(mockService.remove).toHaveBeenCalledTimes(1);
      expect(mockService.remove).toHaveBeenCalledWith('1');
    });
  });
});
