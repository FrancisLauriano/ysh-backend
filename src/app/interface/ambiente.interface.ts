import { IDevice } from './device.interface';

export interface IAmbiente {
  id_ambiente: number;
  nome: string;
  tipo?: string | null;
  devices?: IDevice[] | null;
}
