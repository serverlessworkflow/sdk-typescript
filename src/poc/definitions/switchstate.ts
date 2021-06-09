import { Databasedswitch } from './databasedswitch';
import { Eventbasedswitch } from './eventbasedswitch';

export type Switchstate /* Permits transitions to other states based on data conditions */ =
  | Databasedswitch
  | /* Permits transitions to other states based on events */ Eventbasedswitch;
