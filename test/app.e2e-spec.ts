// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });



import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/employees/employee.entity';
import { EmployeeService } from 'src/employees/employee.service';
import { Repository } from 'typeorm';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let repository: Repository<EmployeeEntity>;

  // Mock data representing a hierarchy
  const mockEmployeeData = [
    {
      id: 1,
      name: "CTO",
      positionId: 1,
      positionName: "CTO",
      child: [
        {
          id: 2,
          name: "Jasim Uddin",
          positionId: 2,
          positionName: "Senior Software Engineer",
          child: [
            {
              id: 3,
              name: "Ashik",
              positionId: 3,
              positionName: "Software Engineer",
              child: {
                id: 4,
                name: "Junior Software Engineer",
                positionId: 4,
                positionName: "Junior Software Engineer",
                child: [],
              },
            },
          ],
        },
      ],
    },
  ];

  // Mock repository with hierarchy retrieval
  const mockRepository = {
    findOne: jest.fn().mockImplementation((query) => {
      const employee = mockEmployeeData.find((emp) => emp.id === query.where.id);
      return employee ? { ...employee } : null; // Clone object to avoid mutation
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(EmployeeEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    repository = module.get<Repository<EmployeeEntity>>(getRepositoryToken(EmployeeEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the employee hierarchy by position', async () => {
    const result = await service.getEmployeeHierarchyByPosition(1);
    
    expect(result).toEqual({
      id: 1,
      name: "CTO",
      positionId: 1,
      positionName: "CTO",
      child: [
        {
          id: 2,
          name: "Jasim Uddin",
          positionId: 2,
          positionName: "Senior Software Engineer",
          child: [
            {
              id: 3,
              name: "Ashik",
              positionId: 3,
              positionName: "Software Engineer",
              child: {
                id: 4,
                name: "Junior Software Engineer",
                positionId: 4,
                positionName: "Junior Software Engineer",
                child: [],
              },
            },
          ],
        },
      ],
    });
  });

  it('should return null if no employee found', async () => {
    const result = await service.getEmployeeHierarchyByPosition(999);
    expect(result).toBeNull();
  });
});
