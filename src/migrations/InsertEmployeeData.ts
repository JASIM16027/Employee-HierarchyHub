import { CentralLogger } from '../loggerServices/centralLogger.service';
import { RedisCacheService } from '../cacheModules/redisCacheModule/redis.service';
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateEmployeeTable1635297421409 implements MigrationInterface {
    constructor(private readonly redisCacheService: RedisCacheService, private readonly logger: CentralLogger) { }
    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.down(queryRunner)
        await queryRunner.createTable(
            new Table({
                name: 'employees',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'name', type: 'varchar', length: '255' },
                    { name: 'positionId', type: 'int' },
                    { name: 'positionName', type: 'varchar', length: '255' },
                    { name: 'parentId', type: 'int', isNullable: true },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'employees',
            new TableForeignKey({
                columnNames: ['parentId'],
                referencedTableName: 'employees',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );

        await queryRunner.query(`
      INSERT INTO employees (id, name, positionId, positionName, parentId) VALUES
      (1, 'Rafi', 1, 'CTO', NULL),
      (2, 'Md. Jasim Uddin', 2, 'Senior Software Engineer', 1),
      (3, 'Rakib', 3, 'Software Engineer', 2),
      (4, 'Tamim', 4, 'Junior Software Engineer', 3)
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Check if the table exists before attempting to drop it
        const tableExists = await queryRunner.hasTable('employees');
        if (tableExists) {
            await queryRunner.query('DELETE FROM employees WHERE id IN (1, 2, 3, 4)');
            await queryRunner.dropTable('employees');
            console.log('Employees table dropped.');
        } else {
            console.log('Employees table does not exist. Skipping drop.');
        }

        // Clear Redis cache after rolling back the migration
        // await this.redisCacheService.flushAllCache();
        // console.log('Redis cache cleared after migration rollback.');
    }
}
