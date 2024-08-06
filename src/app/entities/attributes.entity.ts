import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Device } from './device.entity';

@Entity()
export class Attributes {
  @PrimaryGeneratedColumn()
  id_attributes: number;

  @Column()
  device_class: string;

  @Column()
  friendly_name: string;

  @OneToOne(() => Device)
  device: Device;
}
