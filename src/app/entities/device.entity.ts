import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Attributes } from './attributes.entity';
import { Context } from './context.entity';
import { Ambiente } from './ambiente.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id_device: number;

  @Column()
  name_device: string;

  @Column()
  entity_id: string;

  @Column()
  state: string;

  @Column()
  last_changed: string;

  @Column()
  last_updated: string;

  @ManyToOne(() => Ambiente, (ambiente) => ambiente.devices, { nullable: true })
  ambiente?: Ambiente | null;

  @OneToOne(() => Attributes, { cascade: true, eager: true })
  @JoinColumn()
  attributes: Attributes;

  @OneToOne(() => Context, { cascade: true, eager: true })
  @JoinColumn()
  context: Context;
}
