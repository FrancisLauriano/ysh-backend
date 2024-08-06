import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Device } from './device.entity';

@Entity()
export class Context {
  @PrimaryGeneratedColumn()
  id_context: number;

  @Column()
  id: string;

  @Column({ nullable: true })
  parent_id?: string | null;

  @Column({ nullable: true })
  user_id?: string | null;

  @OneToOne(() => Device)
  device: Device;
}
