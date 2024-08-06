import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Device } from './device.entity';

@Entity()
export class Ambiente {
  @PrimaryGeneratedColumn()
  id_ambiente: number;

  @Column()
  nome: string;

  @Column()
  tipo?: string | null;

  @OneToMany(() => Device, (device) => device.ambiente)
  devices?: Device[] | null;
}
