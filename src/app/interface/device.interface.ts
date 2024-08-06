import { IAttributes } from './attributes.interface';
import { IContext } from './context.interface';
import { IAmbiente } from './ambiente.interface';

export interface IDevice {
  id_device: number;
  name_device: string;
  entity_id: string;
  state: string;
  last_changed: string;
  last_updated: string;
  ambiente?: IAmbiente | null;
  attributes: IAttributes;
  context: IContext;
}
