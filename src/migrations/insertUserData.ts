import { MigrationInterface, QueryRunner, Table } from "typeorm";
import * as bcrypt from 'bcrypt';
export class CreateUsersTable1645202345678 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await this.down(queryRunner);
       
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "username",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false,
                    },
                ],
            }),
            true
        );
        const hashedPassword = await bcrypt.hash('password123', 10);

        await queryRunner.query(`
            INSERT INTO users (username, email, password) 
            VALUES ('Rashid Hasan', 'rashid@hasan.com', '${hashedPassword}')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const usersExists = await queryRunner.hasTable('users');
        if(usersExists){
            await queryRunner.dropTable("users");
            console.log('Employees table dropped.');
        }
       
    }
}
