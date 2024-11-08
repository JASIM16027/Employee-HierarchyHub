
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from '../../src/employees/employee.controller';
import { EmployeeService } from '../../src/employees/employee.service';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  const mockEmployeeService = {
    getEmployeeHierarchyByPosition: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getEmployeeHierarchy', () => {
    it('should return employee hierarchy data for a given employee id ', async () => {
      const mockHierarchy = [
        {
          "id": 1,
          "name": "CTO",
          "positionId": 1,
          "positionName": "CTO",
          "child": [
            {
              "id": 2,
              "name": "Jasim Uddin",
              "positionId": 2,
              "positionName": "Senior Software Engineer",
              "child": [
                {
                  "id": 3,
                  "name": "Ashik",
                  "positionId": 3,
                  "positionName": "Software Engineer",
                  "child": {
                    "id": 4,
                    "name": "Junior Software Engineer",
                    "positionId": 4,
                    "positionName": "Junior Software Engineer",
                    "child": []
                  }
                }
              ]
            }
          ]
        }
      ];

      const expectedChildren = [
        {
          "id": 2,
          "name": "Jasim Uddin",
          "positionId": 2,
          "positionName": "Senior Software Engineer",
          "child": [
            {
              "id": 3,
              "name": "Ashik",
              "positionId": 3,
              "positionName": "Software Engineer",
              "child": {
                "id": 4,
                "name": "Junior Software Engineer",
                "positionId": 4,
                "positionName": "Junior Software Engineer",
                "child": []
              }
            }
          ]
        }
      ]
      mockEmployeeService.getEmployeeHierarchyByPosition.mockResolvedValue(mockHierarchy);

      const result = await controller.getEmployeeHierarchy(1);
   
      // Ensure that only the child data is returned for specific employee id
      expect(result).toEqual(expectedChildren);
      expect(mockEmployeeService.getEmployeeHierarchyByPosition).toHaveBeenCalledWith(1);
    });


    it('should throw an error if no hierarchy is found', async () => {
      mockEmployeeService.getEmployeeHierarchyByPosition.mockResolvedValue(null);

      await expect(controller.getEmployeeHierarchy(99)).rejects.toThrowError('No employees hierarchy found for this employee id');
      expect(mockEmployeeService.getEmployeeHierarchyByPosition).toHaveBeenCalledWith(99);
    });

    it('should return an empty array if no children exist for the given employee id', async () => {
      const mockSingleEmployee = {
        id: 4,
        name: "Rakib",
        positionId: 4,
        positionName: "Junior Software Engineer",
        child: [],
      };

      mockEmployeeService.getEmployeeHierarchyByPosition.mockResolvedValue([mockSingleEmployee]);

      const result = await controller.getEmployeeHierarchy(4);

      // Expect the result to be an empty array as there are no children
      expect(result).toEqual([]);
      expect(mockEmployeeService.getEmployeeHierarchyByPosition).toHaveBeenCalledWith(4);
    });
  });
});
