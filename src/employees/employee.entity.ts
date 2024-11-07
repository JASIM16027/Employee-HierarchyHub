import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('employees')
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  positionId: number;

  @Column()
  positionName: string;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.child, {
    nullable: true,
  })
  parent: EmployeeEntity;

  @OneToMany(() => EmployeeEntity, (employee) => employee.parent)
  child: EmployeeEntity[];
}
