import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ts: Date;

  @Column()
  aqius: number;

  @Column()
  mainus: string;

  @Column()
  aqicn: number;

  @Column()
  maincn: string;
}
