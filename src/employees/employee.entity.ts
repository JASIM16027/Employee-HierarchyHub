// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   OneToMany,
// } from 'typeorm';

// @Entity('employees')
// export class EmployeeEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   positionId: number;

//   @Column()
//   positionName: string;

//   @Column({ nullable: true })
//   parentId: number | null;

//   @ManyToOne(() => EmployeeEntity, (employee) => employee.child, {
//     nullable: true,
//   })
//   parent: EmployeeEntity;

//   @OneToMany(() => EmployeeEntity, (employee) => employee.parent)
//   child: EmployeeEntity[];
// }


import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('employees')
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column()
  positionId: number;

  @Column({ length: 255 })
  positionName: string;


  @ManyToOne(() => EmployeeEntity, (employee) => employee.child, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'parentId' })
  parent: EmployeeEntity | null;
  
  @OneToMany(() => EmployeeEntity, (employee) => employee.parent)
  child: EmployeeEntity[];
}
